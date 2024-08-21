import { ToggleButton } from "@mui/material";
import { styled } from "@mui/system";

const ToggleButtonEx = styled(
	ToggleButton
)(({ theme, checked }) => ({
	transform: !checked ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default ToggleButtonEx;
