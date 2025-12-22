import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import B05CreateButtonContainer from "../B05CreateButtonContainer";
import { B05FetchResultLabelContainer } from "../B05FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<B05CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const B05ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={B05FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

B05ListToolbar.displayName = "B05ListViewToolbar";
export default B05ListToolbar;
