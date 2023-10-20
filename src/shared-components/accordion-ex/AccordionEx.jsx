import { styled, Accordion } from "@mui/material";

const AccordionEx = styled((props) => (
	<Accordion
		disableGutters
		elevation={0}
		square
		defaultExpanded={true}
		{...props}
	/>
))(({ theme }) => ({
	// border: `1px solid ${theme.palette.divider}`,
	"&:not(:last-child)": {
		borderBottom: 0,
	},
	"&:before": {
		display: "none",
	},
}));

export default AccordionEx;
