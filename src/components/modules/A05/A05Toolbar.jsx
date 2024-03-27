import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Box } from "@mui/material";
import { forwardRef, memo } from "react";
import A05CreateButtonContainer from "./A05CreateButtonContainer";
import { A05FetchResultLabelContainer } from "./A05FetchResultLabelContainer";
import ModuleToolbar from "../ModuleToolbar";
import A05PrintButtonContainer from "./A05PrintButtonContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const LeftButtons = memo(() => {
	return (
		<ModuleToolbar>
			<A05CreateButtonContainer />
			<A05PrintButtonContainer />
		</ModuleToolbar>
	);
});

LeftButtons.displayName = "LeftButtons";

const A05Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				pb={1}
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={A05FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

A05Toolbar.displayName = "A05ListViewToolbar";
export default A05Toolbar;
