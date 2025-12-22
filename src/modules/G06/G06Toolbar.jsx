import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import G06CreateButtonContainer from "./G06CreateButtonContainer";
import { G06FetchResultLabelContainer } from "./G06FetchResultLabelContainer";

const LeftButtons = memo(() => (
	<>
		{/* <G06CreateButtonContainer /> */}
	</>
))

LeftButtons.displayName = "LeftButtons";

const G06Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={G06FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

G06Toolbar.displayName = "G06ListViewToolbar";
export default G06Toolbar;

