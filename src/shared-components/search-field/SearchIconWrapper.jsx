import { styled } from "@mui/material";

const SearchIconWrapper = styled("div")(({ theme, placement = "left" }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	...(placement === "right" && {
		right: 0,
	}),
}));

export default SearchIconWrapper;
