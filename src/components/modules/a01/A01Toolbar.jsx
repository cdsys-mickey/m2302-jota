import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Box } from "@mui/material";
import { forwardRef, memo } from "react";
import A01CreateButtonContainer from "./A01CreateButtonContainer";
import { A01FetchResultLabelContainer } from "./A01FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<Box>
			<A01CreateButtonContainer />
		</Box>
	);
});

LeftButtons.displayName = "LeftButtons";

const A01Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<InlineListViewToolbar
				pb={1}
				ref={ref}
				leftComponent={LeftButtons}
				// rightComponent={() => <FetchResultLabel totalElements={365} />}
				rightComponent={A01FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

A01Toolbar.displayName = "A01ListViewToolbar";
export default A01Toolbar;
