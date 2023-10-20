import { styled } from "@mui/system";
import { IconButton } from "@mui/material";
import { forwardRef } from "react";

const ExpandMoreButton = styled(
	forwardRef(({ expanded, ...rest }, ref) => {
		return <IconButton ref={ref} {...rest} />;
	})
)(({ theme, expanded }) => ({
	transform: !expanded ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

export default ExpandMoreButton;
