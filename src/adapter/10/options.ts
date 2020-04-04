import { Options, VNode } from "preact";
import { Preact10Renderer } from "./renderer";
import { addHookStack } from "./renderer/inspectVNode";

export function setupOptions(options: Options, renderer: Preact10Renderer) {
	const o = options as any;

	// Store (possible) previous hooks so that we don't overwrite them
	let prevVNodeHook = options.vnode;
	let prevCommitRoot = o._commit || o.__c;
	let prevBeforeUnmount = options.unmount;
	let prevBeforeDiff = o._diff || o.__b;
	let prevAfterDiff = options.diffed;
	let prevHook = (options as any)._hook || o.__h;

	options.vnode = vnode => {
		// Tiny performance improvement by initializing fields as doubles
		// from the start. `performance.now()` will always return a double.
		// See https://github.com/facebook/react/issues/14365
		// and https://slidr.io/bmeurer/javascript-engine-fundamentals-the-good-the-bad-and-the-ugly
		vnode.startTime = NaN;
		vnode.endTime = NaN;

		vnode.startTime = 0;
		vnode.endTime = -1;
		if (prevVNodeHook) prevVNodeHook(vnode);

		(vnode as any).old = null;
	};

	o._diff = o.__b = (vnode: VNode) => {
		vnode.startTime = performance.now();
		if (prevBeforeDiff != null) prevBeforeDiff(vnode);
	};

	options.diffed = vnode => {
		vnode.endTime = performance.now();

		if (prevAfterDiff) prevAfterDiff(vnode);
	};

	o._commit = o.__c = (vnode: VNode | null, queue: any[]) => {
		if (prevCommitRoot) prevCommitRoot(vnode, queue);

		// These cases are already handled by `unmount`
		if (vnode == null) return;

		renderer.onCommit(vnode);
	};

	options.unmount = vnode => {
		if (prevBeforeUnmount) prevBeforeUnmount(vnode);
		renderer.onUnmount(vnode as any);
	};

	(options as any)._hook = o.__h = (currentComponent: any, type: number) => {
		addHookStack(type);
		if (prevHook) prevHook(currentComponent, type);
	};

	// Teardown devtools options. Mainly used for testing
	return () => {
		options.unmount = prevBeforeUnmount;
		o._commit = o.__c = prevCommitRoot;
		options.diffed = prevAfterDiff;
		o._diff = o.__b = prevBeforeDiff;
		options.vnode = prevVNodeHook;
		(options as any)._hook = o.__h;
	};
}
