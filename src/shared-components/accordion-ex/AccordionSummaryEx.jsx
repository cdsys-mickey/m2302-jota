import { TheatersOutlined } from "@mui/icons-material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { AccordionSummary, styled } from "@mui/material";

const AccordionSummaryEx = styled((props) => (
	<AccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
		{...props}
	/>
))(({ theme }) => ({
	minHeight: theme.spacing(2),
	paddingRight: theme.spacing(1),
	paddingLeft: 0,
	paddingTop: 0,
	paddingBottom: 0,
	backgroundColor:
		theme.palette.mode === "dark"
			? "rgba(255, 255, 255, .05)"
			: "rgba(0, 0, 0, .03)",
	// flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)",
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: theme.spacing(1),
		marginTop: theme.spacing(0.5),
		marginBottom: theme.spacing(0.5),
	},
}));

export default AccordionSummaryEx;
