import { Box } from "@mui/material";
import React from "react";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import { C04CreateButtonContainer } from "@/mock-components/C04/C04CreateButtonContainer";
import { C04ManageReportButtonContainer } from "@/mock-components/C04/C04ManageReportButtonContainer";
import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";

const LeftButtons = () => {
	return (
		<Box
			sx={{
				"& button": {
					marginRight: "4px",
				},
			}}>
			<C04CreateButtonContainer />
			<C04ManageReportButtonContainer />
		</Box>
	);
};

export const C04ListViewToolbar = React.forwardRef(({ ...rest }, ref) => {
	return (
		// <GridListViewToolbar
		<InlineListViewToolbar
			pb={1}
			ref={ref}
			left={<LeftButtons />}
			right={<FetchResultLabel totalElements={6} />}
			{...rest}
		/>
	);
});
