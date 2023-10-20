import { Box } from "@mui/system";
import clsx from "clsx";
import MdEditor from "@/modules/md-editor";
import { useCallback, useEffect, useState } from "react";
import FieldGroupWithLabel from "@/shared-components/FieldGroupWithLabel";
import GovDoc from "@/modules/gov-doc";
import { DefaultElement, Editable, Slate } from "slate-react";
import GovDocEditor from "@/modules/gov-doc-editor";
import "./GovDocField.css";
import GovDocFieldBox from "./GovDocFieldBox";
import GovDocToolbar from "./GovDocToolbar";

const ListItemElement = ({ children, element }) => {
	console.debug(`children:`, children);
	return (
		<div className={clsx("item-wrapper", `item-lvl-${element.level}`)}>
			<div className="item-bullet" contentEditable={false}>
				{element.bullet || "?"}
			</div>
			<div className="item-text">{children}</div>
		</div>
	);
};

const GovDocField = ({
	readOnly,
	editor,
	label,
	value,
	onChange,
	debug = false,
	...rest
}) => {
	// const [editor] = useState(() => withReact(withHistory(createEditor())), []);
	//for rewriteBullets
	const [state, setState] = useState({
		rows: 0,
		data: null,
	});
	// const debounced = useDebounce(state?.data, 800);

	const renderElement = useCallback((props) => {
		// console.debug(props, "props");
		switch (props.element.type) {
			case GovDoc.ELEMENT_LI:
				return <ListItemElement {...props} />;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);

	const handleKeyDown = useCallback(
		(e) => {
			// console.debug(e.key);
			switch (e.key) {
				case "`":
					// 切換項目符號模式
					if (!e.ctrlKey) {
						return;
					}
					e.preventDefault();
					GovDocEditor.toggleListItemBlock(editor);
					break;
				case "Enter":
					if (e.ctrlKey) {
						e.preventDefault();
						// 插入換行符號
						GovDocEditor.insertLineBreak(editor);
					} else {
						// 新增項目
						GovDocEditor.insertListItem(editor);
					}
					break;
				case "Tab":
					e.preventDefault();
					if (e.shiftKey) {
						GovDocEditor.outdent(editor);
					} else {
						GovDocEditor.indent(editor);
					}
					break;
				default:
					//do nothing
					break;
			}
		},
		[editor]
	);

	const handleSlateChange = useCallback((value) => {
		// setRows(value?.length || 0);
		setState({
			// data: value,
			rows: value?.length || 0,
		});
	}, []);

	const handleSlateBlur = useCallback(
		(e) => {
			console.debug("handleSlateBlur");
			onChange(editor.children);
		},
		[editor.children, onChange]
	);

	// 當 rows 改變觸發 rewriteBullets
	useEffect(() => {
		console.debug(`rows = ${state?.rows}`);
		GovDocEditor.rewriteBullets(editor);
	}, [editor, state?.rows]);

	return (
		<FieldGroupWithLabel label={label}>
			<Slate
				editor={editor}
				value={value}
				hideOnBlur={false}
				onChange={handleSlateChange}

				// onChange={setRows}
			>
				<GovDocFieldBox sx={{ bgcolor: "#fff" }} readOnly={readOnly}>
					<GovDocToolbar
						debug={debug}
						bgcolor="#ebe9e9"
						readOnly={readOnly}
					/>
					<Box p={2}>
						<Editable
							readOnly={readOnly}
							disabled={readOnly}
							style={
								readOnly
									? MdEditor.STYLE_DISABLED
									: MdEditor.STYLE_NORMAL
							}
							renderElement={renderElement}
							// renderLeaf={renderLeaf}
							onKeyDown={handleKeyDown}
							onBlur={handleSlateBlur}
						/>
					</Box>
				</GovDocFieldBox>
			</Slate>
		</FieldGroupWithLabel>
	);
};

export default GovDocField;
