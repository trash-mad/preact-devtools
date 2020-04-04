import {
	getComponent,
	getComponentHooks,
	getDisplayName,
	getHookState,
} from "../vnode";
import { jsonify, cleanContext, cleanProps, setIn, hasIn } from "../utils";
import { serializeVNode, RendererConfig10, getDevtoolsType } from "../renderer";
import { ID } from "../../../view/store/types";
import { IdMappingState, getVNodeById } from "../IdMapper";
import { VNode, Component } from "preact";
import { parseStackTrace, StackFrame } from "errorstacks";
import { HookType } from "../../../constants";
import { debug } from "../../../debug";
import { ObjPath } from "../../../view/components/sidebar/ElementProps";

function serialize(config: RendererConfig10, data: object | null) {
	return jsonify(data, node => serializeVNode(node, config), new Set());
}

/**
 * Serialize all properties/attributes of a `VNode` like `props`, `context`,
 * `hooks`, and other data. This data will be requested when the user selects a
 * `VNode` in the devtools. It returning information will be displayed in the
 * sidebar.
 */
export function inspectVNode(
	ids: IdMappingState,
	config: RendererConfig10,
	id: ID,
) {
	const vnode = getVNodeById(ids, id);
	if (!vnode) return null;

	const c = getComponent(vnode);
	const hasState =
		typeof vnode.type === "function" &&
		c != null &&
		Object.keys(c.state).length > 0;

	const hasHooks = c != null && getComponentHooks(c) != null;
	const hooks = hasHooks ? inspectHooks(config, vnode) : null;
	const context = c != null ? serialize(config, cleanContext(c.context)) : null;
	const props =
		vnode.type !== null ? serialize(config, cleanProps(vnode.props)) : null;
	const state = hasState ? serialize(config, c!.state) : null;

	return {
		context,
		canEditHooks: hasHooks,
		hooks,
		id,
		name: getDisplayName(vnode, config),
		canEditProps: true,
		props,
		canEditState: true,
		state,
		// TODO: We're not using this information anywhere yet
		type: getDevtoolsType(vnode),
	};
}

/**
 * Throwaway component to render hooks
 */
function Dummy() {}
Dummy.prototype = Component.prototype;

export interface HookData {
	type: HookType;
	stack: StackFrame[];
}

let hookLog: HookData[] = [];
let inspectingHooks = false;
let ancestorName = "unknown";

export function addHookStack(type: HookType) {
	if (!inspectingHooks) return;
	const err = new Error();
	let stack = err.stack ? parseStackTrace(err.stack) : [];
	const ancestorIdx = stack.findIndex(x => x.name === ancestorName);

	if (ancestorIdx > -1 && stack.length > 0) {
		// Remove `addHookStack` + `options._hook` + `getHookState` from stack
		let trim = 3;
		// These hooks are implemented with other hooks
		if (
			type === HookType.useState ||
			type === HookType.useImperativeHandle ||
			type === HookType.useCallback
		) {
			trim += 1;
		}
		stack = stack.slice(trim, ancestorIdx - 1);
	}

	hookLog.push({ type, stack });
}

export function inspectHooks(config: RendererConfig10, vnode: VNode) {
	inspectingHooks = true;
	hookLog = [];
	// TODO: Temporarily disable any console logs
	ancestorName = parseStackTrace(new Error().stack!)[0].name;

	const c = getComponent(vnode)!;
	const isClass =
		(vnode.type as any).prototype && (vnode.type as any).prototype.render;

	try {
		// Call render on a dummy component, so that any possible
		// state changes or effect are not written to our original
		// component.
		const dummy = {
			props: c.props,
			context: c.context,
			state: {},
		};
		if (isClass) {
			c.render.call(dummy, dummy.props, dummy.state);
		} else {
			c.constructor(dummy.props, dummy.context);
		}
	} catch (e) {
		// We don't care about any errors here. We only need
		// the hook call sites
		debug(e);
	}

	const parsed = hookLog.length ? parseHookData(config, hookLog, c) : null;

	inspectingHooks = false;
	ancestorName = "unknown";
	hookLog = [];

	return parsed;
}

export interface HookItem {
	name: string;
	type: HookType;
	index: number;
	value: any;
	children: HookItem[];
}

function parseHookData(
	config: RendererConfig10,
	data: HookData[],
	component: Component,
): Record<string, any> {
	const out: Record<string, any> = {};

	data.forEach((hook, hookIdx) => {
		let itemPath = [];
		for (let i = hook.stack.length - 1; i >= 0; i--) {
			const frame = hook.stack[i];
			const isNative = i === 0;
			// Store hook index in the name to be able to retreive it later for
			// updating. On top of that htis helps to work around an issue where
			// a user may have named a custom hook like an internal one
			// lile "useState". Since identifiers cannot start with numeric literals
			// in JavaScript, but our native function has a numeric prefix, we can
			// differentiate the two.
			const name = isNative ? `${hookIdx}__${HookType[hook.type]}` : frame.name;
			itemPath.push(name);

			if (!hasIn(parent, itemPath)) {
				let value = null;
				if (isNative) {
					const s = getHookState(component, hookIdx);
					value = serialize(config, s[0]);
				}

				setIn(out, itemPath, value);
			}
		}
	});

	return out;
}

const nativeName = /^\d+__\S+$/;
export function getHookFromPath(objPath: ObjPath) {
	for (let i = objPath.length - 1; i >= 0; i--) {
		if (nativeName.test("" + objPath[i])) {
			return objPath.slice(0, i);
		}
	}

	return objPath;
}
