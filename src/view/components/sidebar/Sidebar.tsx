import { h, Fragment } from "preact";
import { useEmitter } from "../../store/react-bindings";
import { PropsPanel } from "./PropsPanel";
import { serializeProps } from "./serializeProps";
import { useCallback } from "preact/hooks";

export function Sidebar() {
	const emit = useEmitter();

	const onCopy = useCallback((v: any) => emit("copy", serializeProps(v)), []);

	return (
		<Fragment>
			<PropsPanel
				label="Props"
				getData={d => d.props}
				checkEditable={data => data.canEditProps}
				onChange={(id, path, value) => emit("update-prop", { id, path, value })}
				onCopy={onCopy}
				canAddNew
			/>
			<PropsPanel
				label="State"
				isOptional
				getData={d => d.state}
				checkEditable={data => data.canEditState}
				onChange={(id, path, value) =>
					emit("update-state", { id, path, value })
				}
				onCopy={onCopy}
			/>
			<PropsPanel
				label="Hooks"
				isOptional
				getData={d => d.hooks}
				checkEditable={data => data.canEditHooks}
				onChange={(id, path, value) => emit("update-hook", { id, path, value })}
				onCopy={onCopy}
			/>
			<PropsPanel
				label="Context"
				isOptional
				getData={d => d.context}
				checkEditable={() => true}
				onChange={(id, path, value) =>
					emit("update-context", { id, path, value })
				}
				onCopy={onCopy}
			/>
			{/* {inspect != null && inspect.hooks && (
					<SidebarPanel title="hooks" empty="None"></SidebarPanel>
				)} */}
		</Fragment>
	);
}
