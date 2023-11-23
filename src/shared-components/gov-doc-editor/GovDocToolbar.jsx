import FormatIndentDecreaseIcon from "@mui/icons-material/FormatIndentDecrease";
import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import RedoIcon from "@mui/icons-material/Redo";
import UndoIcon from "@mui/icons-material/Undo";
import { Button, IconButton, styled, Tooltip, Typography } from "@mui/material";

import { forwardRef } from "react";
import { useSlate } from "slate-react";
import GovDocEditor from "@/modules/gov-doc-editor";
import FlexBox from "@/shared-components/FlexBox";

const ToolbarBox = styled(({ bgcolor, children, ...rest }) => {
	return (
		<FlexBox fullWidth {...rest}>
			{children}
		</FlexBox>
	);
})(({ bgcolor = "gray" }) => ({
	backgroundColor: bgcolor,
	minHeight: "1em",
	borderTopLeftRadius: "4px",
	borderTopRightRadius: "4px",
}));

const ToolbarIconButtonStub = styled(
	forwardRef((props, ref) => {
		const { active, IconComponent, ...rest } = props;
		return (
			<IconButton ref={ref} {...rest}>
				<IconComponent />
			</IconButton>
		);
	})
)(({ theme, active }) => ({
	borderRadius: 0,
	color: active ? "black" : "#ccc",
}));

const ToolbarIconButton = ({ title, ...rest }) => {
	if (title) {
		return (
			<Tooltip title={title}>
				<ToolbarIconButtonStub {...rest} />
			</Tooltip>
		);
	} else {
		return <ToolbarIconButtonStub {...rest} />;
	}
};

const ToolbarButtonText = styled(({ children }) => {
	return <Typography variant="h6">{children}</Typography>;
})(({ theme }) => ({
	lineHeight: "34px",
	color: theme.palette.text.secondary,
}));

const ToolbarLabelButtonStub = styled(
	forwardRef((props, ref) => {
		const { label, title, ...rest } = props;
		return (
			<Button color="inherit" ref={ref} {...rest}>
				<ToolbarButtonText>{label}</ToolbarButtonText>
			</Button>
		);
	})
)(({ theme }) => ({
	padding: 0,
	minWidth: "40px",
}));

const ToolbarLabelButton = ({ title, ...rest }) => {
	if (title) {
		return (
			<Tooltip title={title}>
				<ToolbarLabelButtonStub {...rest} />
			</Tooltip>
		);
	} else {
		return <ToolbarLabelButtonStub {...rest} />;
	}
};

export const ToolbarDivider = styled("div")(({ theme }) => ({
	borderLeft: "1px solid rgba(0,0,0,0.2)",
	borderRight: "1px solid #fff",
	marginLeft: theme.spacing(1),
	marginRight: theme.spacing(1),
}));

const GovDocToolbar = ({ readOnly, debug = false, ...rest }) => {
	const editor = useSlate();

	return (
		<ToolbarBox {...rest}>
			<ToolbarIconButton
				disabled={readOnly}
				title="切換項目符號段落 ( ctrl+ ` )"
				IconComponent={FormatListNumberedIcon}
				// active={!GovDocEditor.isListItemBlockActive(editor)}
				active={true}
				onClick={(e) => GovDocEditor.toggleListItemBlock(editor, true)}
			/>
			<ToolbarIconButton
				disabled={readOnly}
				title="增加縮排 ( Tab )"
				IconComponent={FormatIndentIncreaseIcon}
				active={GovDocEditor.isIndentActive(editor)}
				onClick={(e) => {
					GovDocEditor.indent(editor, true);
				}}
			/>
			<ToolbarIconButton
				disabled={readOnly}
				title="減少縮排 ( Shift + Tab )"
				IconComponent={FormatIndentDecreaseIcon}
				active={GovDocEditor.isOutdentActive(editor)}
				onClick={(e) => {
					GovDocEditor.outdent(editor, true);
				}}
			/>

			<ToolbarIconButton
				disabled={readOnly}
				// title="段落內換行 ( ctrl-Enter )"
				title="段落內換行 ( ctrl + Enter )"
				IconComponent={KeyboardReturnIcon}
				active={GovDocEditor.isInsertLinkBreakActive(editor)}
				onClick={(e) => GovDocEditor.insertLineBreak(editor, true)}
			/>
			<ToolbarIconButton
				disabled={readOnly}
				title="回復上一步 ( ctrl + Z )"
				IconComponent={UndoIcon}
				active={GovDocEditor.isUndoActive(editor)}
				onClick={(e) => GovDocEditor.undo(editor, true)}
			/>
			<ToolbarIconButton
				disabled={readOnly}
				title="重做下一步 ( ctrl + Y )"
				IconComponent={RedoIcon}
				active={GovDocEditor.isRedoActive(editor)}
				onClick={(e) => GovDocEditor.redo(editor, true)}
			/>
			<ToolbarDivider />

			<ToolbarLabelButton
				disabled={readOnly}
				label="，"
				onClick={(e) => GovDocEditor.insertText(editor, "，", true)}
				title="插入全形符號，"
			/>
			<ToolbarLabelButton
				disabled={readOnly}
				label="。"
				onClick={(e) => GovDocEditor.insertText(editor, "。", true)}
				title="插入全形符號。"
			/>
			<ToolbarLabelButton
				disabled={readOnly}
				label="（）"
				onClick={(e) =>
					GovDocEditor.insertWrapper(editor, "（", "）", true)
				}
				title="插入全形符號（）"
			/>
			<ToolbarLabelButton
				disabled={readOnly}
				label="「」"
				onClick={(e) =>
					GovDocEditor.insertWrapper(editor, "「", "」", true)
				}
				title="插入全形符號「」"
			/>
			<ToolbarLabelButton
				disabled={readOnly}
				label="『』"
				onClick={(e) =>
					GovDocEditor.insertWrapper(editor, "『", "』", true)
				}
				title="插入全形符號『』"
			/>
			{debug && (
				<>
					<ToolbarDivider />
					<ToolbarLabelButton
						disabled={readOnly}
						label="位"
						onClick={(e) => {
							GovDocEditor.debugPrintPosition(editor);
						}}
						title="目前位置"
					/>
					<ToolbarLabelButton
						disabled={readOnly}
						label="值"
						onClick={(e) => {
							GovDocEditor.debugPrintValue(editor);
						}}
						title="目前的值"
					/>
					<ToolbarLabelButton
						disabled={readOnly}
						label="選"
						onClick={(e) => {
							GovDocEditor.debugPrintSelection(editor);
						}}
						title="目前的值"
					/>
				</>
			)}
		</ToolbarBox>
	);
};

export default GovDocToolbar;
