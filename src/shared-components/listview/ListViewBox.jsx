import { Box, Paper, styled } from "@mui/material";

const ListViewBox = styled(Paper, {
	name: "ListViewBox",
	shouldForwardProp: (prop) => prop !== "withHeader",
})(({ theme, withHeader, square }) => ({
	paddingRight: "2px",
	...((withHeader || square) && {
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	}),
	...(square && {
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	}),
	marginBottom: "4px"
}));

ListViewBox.propTypes = {};

ListViewBox.displayName = "ListViewBox";
export default ListViewBox;
