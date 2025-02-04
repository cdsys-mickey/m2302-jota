import { Box, styled } from "@mui/material";

const FormSectionBox = styled(Box, {
	shouldForwardProp: (prop) =>
		!["editing"].includes(prop),
})(
	({
		theme,
		bgcolor = "rgba(255, 255, 255, 100.0)",
		borderColor = "rgb(16 160 215)",
		editing = false,
		pt,
		pb,
		pl,
		pr,
		mb
	}) => ({
		backgroundColor: bgcolor,
		borderRadius: theme.spacing(1),
		// borderBottom: `1px solid ${borderColor}`,
		borderLeft: `5px solid ${borderColor}`,
		boxShadow: "rgba(0, 0, 0, 0.16) 1px 1px 6px",
		paddingTop: theme.spacing(pt != null ? pt : (editing ? 1.5 : 0.5)),
		// paddingBottom: theme.spacing(pb != null ? pb : (editing ? 0 : 1)),
		paddingBottom: theme.spacing(pb != null ? pb : 1),
		paddingLeft: theme.spacing(pl != null ? pl : 1),
		paddingRight: theme.spacing(pr != null ? pr : 1),
		// marginTop: theme.spacing(1),
		// marginTop: theme.spacing(0),
		marginBottom: theme.spacing(mb != null ? mb : 2),
	})
);
FormSectionBox.displayName = "FormSectionBox";
export default FormSectionBox;
