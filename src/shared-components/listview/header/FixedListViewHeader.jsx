import { styled } from "@mui/material";
import React from "react";
import Layouts from "@/shared-modules/md-layouts";

const FixedListViewHeader = styled(
	"nav",
	{}
)(({ theme, height, width = "100%" }) => ({
	position: "fixed",
	width: width,
	// top: 0,
	// left: 0,
	height: height,
	display: "flex",
	alignItems: "center",
	backgroundColor: "rgb(0 0 0 / 40%)",
	// transition: "top 0.6s",
	color: "#fff",
	zIndex: Layouts.Z_INDEX_LISTVIEW_HEADER,
	borderTopLeftRadius: theme.spacing(0.5),
	borderTopRigtRadius: theme.spacing(0.5),
}));

export default React.memo(FixedListViewHeader);
