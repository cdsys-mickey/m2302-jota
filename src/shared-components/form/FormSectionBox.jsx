import { Box, styled } from "@mui/material";

const COMPONENT_NAME = "FormSectionBox";

const FormSectionBox = styled(Box, {
	name: COMPONENT_NAME,
	slot: "root",
	shouldForwardProp: (prop) =>
		!["editing"].includes(prop),
})(
	({
		theme,
		bgcolor = "rgba(255, 255, 255, 100.0)",
		borderColor = "rgb(16 160 215)",
		// editing = false,
		// pt,
		pt = 1,
		pb,
		pl = 1,
		pr,
		mb
	}) => ({
		backgroundColor: bgcolor,
		borderRadius: theme.spacing(1),
		// borderBottom: `1px solid ${borderColor}`,
		borderLeft: `5px solid ${borderColor}`,
		boxShadow: "rgba(0, 0, 0, 0.16) 1px 1px 6px",
		// paddingTop: theme.spacing(pt != null ? pt : (editing ? 1.5 : 1)),
		paddingTop: theme.spacing(pt),
		// paddingBottom: theme.spacing(pb != null ? pb : (editing ? 0 : 1)),
		paddingBottom: theme.spacing(pb != null ? pb : 1),
		paddingLeft: theme.spacing(pl),
		paddingRight: theme.spacing(pr != null ? pr : 1),
		// marginTop: theme.spacing(1),
		// marginTop: theme.spacing(0),
		marginBottom: theme.spacing(mb != null ? mb : 2),
		// '& .MuiFormControl-root:has(.MuiOutlinedInput-root)': {
		// 	marginTop: theme.spacing(0.5),
		// },
		// Box 下包含 MuiOutlinedInput 的 MuiFormControl, 套用下列格式, 但排除 .dsg-container 之下
		// '& .MuiFormControl-root:not(.dsg-container .MuiFormControl-root):has(.MuiOutlinedInput-root)': {
		// 	marginTop: theme.spacing(0.5),
		// },
	})
);
export default FormSectionBox;
