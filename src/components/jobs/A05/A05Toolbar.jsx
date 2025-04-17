import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Box } from "@mui/material";
import { forwardRef, memo } from "react";
import A05CreateButtonContainer from "./A05CreateButtonContainer";
import { A05FetchResultLabelContainer } from "./A05FetchResultLabelContainer";
import ModuleToolbar from "../ModuleToolbar";
import A05PrintButtonContainer from "./A05PrintButtonContainer";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";

const LeftButtons = memo(() => {
	return (
		<>
			<A05CreateButtonContainer />
			<A05PrintButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const A05Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ListToolbar
				// pb={1}
				alignItems="flex-end"
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
