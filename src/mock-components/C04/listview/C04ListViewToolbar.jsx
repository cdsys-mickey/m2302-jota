import { C04CreateButtonContainer } from "@/mock-components/C04/C04CreateButtonContainer";
import { C04ManageReportButtonContainer } from "@/mock-components/C04/C04ManageReportButtonContainer";
import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Box } from "@mui/material";
import { forwardRef, memo } from "react";

const LeftButtons = memo(() => {
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
});
LeftButtons.displayName = "LeftButtons";

const C04ListViewToolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			// <GridListViewToolbar
			<InlineListViewToolbar
				pb={1}
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={() => <FetchResultLabel totalElements={6} />}
				{...rest}
			/>
		);
	})
);
C04ListViewToolbar.displayName = "C04ListViewToolbar";

export default C04ListViewToolbar;
