import { Box, styled } from "@mui/material";

const FormSectionBox = styled(Box, {
	shouldForwardProp: (prop) =>
		!``
			.trim()
			.split(/\s*,\s*/)
			.includes(prop),
})(
	({
		theme,
		bgcolor = "rgba(255, 255, 255, 100.0)",
		borderColor = "rgb(16 160 215)",
		// borderLeft = "5px solid",
	}) => ({
		backgroundColor: bgcolor,
		borderRadius: theme.spacing(1),
		// borderBottom: `1px solid ${borderColor}`,
		borderLeft: `5px solid ${borderColor}`,
		boxShadow: "rgba(0, 0, 0, 0.16) 1px 1px 6px",
		paddingBottom: "16px",
		paddingLeft: "12px",
		paddingRight: "12px",
	})
);

export default FormSectionBox;
