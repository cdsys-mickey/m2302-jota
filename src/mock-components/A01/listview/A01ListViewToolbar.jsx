import { Box } from "@mui/material";
import React from "react";
import ButtonEx from "@/shared-components/button/ButtonEx";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import GridListViewToolbar from "@/shared-components/listview/toolbar/GridListViewToolbar";
import { A01CreateButtonContainer } from "../A01CreateButtonContainer";
import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef } from "react";

const LeftButtons = () => {
	return (
		<Box>
			<A01CreateButtonContainer />
		</Box>
	);
};

const A01ListViewToolbar = forwardRef(({ ...rest }, ref) => {
	return (
		// <GridListViewToolbar
		<InlineListViewToolbar
			pb={1}
			ref={ref}
			left={<LeftButtons />}
			right={<FetchResultLabel totalElements={365} />}
			{...rest}
		/>
	);
});

A01ListViewToolbar.displayName = "A01ListViewToolbar";
export default A01ListViewToolbar;
