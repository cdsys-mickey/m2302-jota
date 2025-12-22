import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import A05CreateButtonContainer from "./A05CreateButtonContainer";
import { A05FetchResultLabelContainer } from "./A05FetchResultLabelContainer";
import A05PrintButtonContainer from "./A05PrintButtonContainer";

const LeftButtons = memo(() => (
	<>
		<A05CreateButtonContainer />
		<A05PrintButtonContainer />
	</>
))

LeftButtons.displayName = "LeftButtons";

const A05Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
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
