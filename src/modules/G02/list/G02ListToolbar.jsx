import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import { G02FetchResultLabelContainer } from "../G02FetchResultLabelContainer";
import G02WriteOffButtonContainer from "../G02WriteOffButtonContainer";
import G02PrintButtonContainer from "../G02PrintButtonContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<G02WriteOffButtonContainer />
			<G02PrintButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const G02ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<ToolbarEx
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={G02FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

G02ListToolbar.displayName = "G02ListViewToolbar";
export default G02ListToolbar;

