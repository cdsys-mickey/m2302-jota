import FetchResultLabel from "@/shared-components/listview/FetchResultLabel";
import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Box } from "@mui/material";
import { forwardRef, memo } from "react";
import A01CreateButtonContainer from "./A01CreateButtonContainer";
import { A01FetchResultLabelContainer } from "./A01FetchResultLabelContainer";
import A01PrintButtonContainer from "./A01PrintButtonContainer";
import ModuleToolbar from "../ModuleToolbar";

const LeftButtons = memo(() => {
	return (
		<ModuleToolbar>
			<A01CreateButtonContainer />
			<A01PrintButtonContainer color="neutral" />
		</ModuleToolbar>
	);
});

LeftButtons.displayName = "LeftButtons";

const A01Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<InlineListViewToolbar
				pb={1}
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={A01FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

A01Toolbar.displayName = "A01ListViewToolbar";
export default A01Toolbar;
