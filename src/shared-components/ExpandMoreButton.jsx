import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

const ExpandMoreButton = styled(
	IconButton
)(({ theme, expanded }) => ({
	transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default ExpandMoreButton;
