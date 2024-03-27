import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Box } from "@mui/material";
import { forwardRef, memo } from "react";
import A06CreateButtonContainer from "./A06CreateButtonContainer";
import { A06FetchResultLabelContainer } from "./A06FetchResultLabelContainer";
import A06PrintButtonContainer from "./A06PrintButtonContainer";
import ModuleToolbar from "../ModuleToolbar";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const LeftButtons = memo(() => {
	return (
		<ModuleToolbar>
			<A06CreateButtonContainer />
			<A06PrintButtonContainer />
		</ModuleToolbar>
	);
});

LeftButtons.displayName = "LeftButtons";

const A06Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				pb={1}
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={A06FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

A06Toolbar.displayName = "A06ListViewToolbar";
export default A06Toolbar;
