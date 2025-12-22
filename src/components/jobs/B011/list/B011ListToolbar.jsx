import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import B011CreateButtonContainer from "../B011CreateButtonContainer";
import { B011FetchResultLabelContainer } from "../B011FetchResultLabelContainer";
import B011PrintButtonContainer from "../dialog/toolbar/B011PrintButtonContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<B011CreateButtonContainer />
			<B011PrintButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const B011ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={B011FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

B011ListToolbar.displayName = "B011ListViewToolbar";
export default B011ListToolbar;

