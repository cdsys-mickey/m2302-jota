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
		bgcolor = "rgba(0, 0, 0, 0.02)",
		borderColor = "rgb(16 160 215)",
		// borderLeft = "5px solid",
	}) => ({
		// backgroundColor: bgcolor,
		borderRadius: theme.spacing(1),
		// borderBottom: `1px solid ${borderColor}`,
		borderLeft: `5px solid ${borderColor}`,
		boxShadow: "rgba(0, 0, 0, 0.16) 1px 1px 6px",
	})
);

export default FormSectionBox;
