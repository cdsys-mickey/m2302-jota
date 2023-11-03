import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Box } from "@mui/material";
import React, { forwardRef, memo } from "react";
import { MockA01CreateButtonContainer } from "../MockA01CreateButtonContainer";

const LeftButtons = memo(() => {
	return (
		<Box>
			<MockA01CreateButtonContainer />
		</Box>
	);
});

LeftButtons.displayName = "LeftButtons";

const MockA01ListViewToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
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
	})
);

MockA01ListViewToolbar.displayName = "A01ListViewToolbar";
export default MockA01ListViewToolbar;
