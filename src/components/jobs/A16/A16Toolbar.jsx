import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Box } from "@mui/material";
import { forwardRef, memo } from "react";
import A16CreateButtonContainer from "./A16CreateButtonContainer";
import { A16FetchResultLabelContainer } from "./A16FetchResultLabelContainer";
import ModuleToolbar from "../ModuleToolbar";
import A16PrintButtonContainer from "./A16PrintButtonContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const LeftButtons = memo(() => {
	return (
		<>
			<A16CreateButtonContainer />
			<A16PrintButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const A16Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={A16FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

A16Toolbar.displayName = "A16ListViewToolbar";
export default A16Toolbar;

