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
		bgcolor = "transpanret",
		borderLeft = "5px solid transparent",
	}) => ({
		backgroundColor: bgcolor,
		borderRadius: theme.spacing(1),
		borderLeft: borderLeft,
	})
);

export default FormSectionBox;
