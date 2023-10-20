import React from "react";
import { Box } from "@mui/material";

import C04FrameBannerContainer from "@/mock-components/C04/C04FrameBannerContainer";
import C04DialogContainer from "@/mock-components/C04/dialog/C04DialogContainer";
import C04ListViewContainer from "@/mock-components/C04/listview/C04ListViewContainer";
import { C04ListViewToolbar } from "@/mock-components/C04/listview/C04ListViewToolbar";
import { forwardRef } from "react";
import { memo } from "react";

const MockC04Page = memo(
	forwardRef(({ data, ...rest }, ref) => {
		return (
			<Box>
				{/* <FrameBannerContainer title="進貨單輸入作業" alt="C04" /> */}
				<C04FrameBannerContainer />
				<C04ListViewToolbar />
				<C04ListViewContainer />
				<C04DialogContainer />
			</Box>
		);
	})
);

MockC04Page.displayName = "MockC04Page";

export default MockC04Page;
