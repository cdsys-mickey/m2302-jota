import { Paper, styled } from "@mui/material";
import { FlexBox } from "shared-components";

const ListViewFlexBox = styled(FlexBoxView, {
	name: "ListViewBox",
	shouldForwardProp: (prop) => prop !== "withHeader",
})(({ theme, withHeader }) => ({
	...(withHeader && {
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	}),
}));

ListViewFlexBox.propTypes = {};

ListViewFlexBox.displayName = "ListViewFlexBox";
export default ListViewFlexBox;
