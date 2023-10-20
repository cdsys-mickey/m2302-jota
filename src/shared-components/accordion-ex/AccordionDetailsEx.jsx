import { styled, AccordionDetails } from "@mui/material";

const AccordionDetailsEx = styled(AccordionDetails)(({ theme }) => ({
	padding: 0,
	// paddingTop: 0,
	// paddingBottom: 0,
	// paddingLeft: theme.spacing(1),
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default AccordionDetailsEx;
