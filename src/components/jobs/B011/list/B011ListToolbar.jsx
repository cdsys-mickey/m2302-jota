import { forwardRef, memo } from "react";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import ModuleToolbar from "../../ModuleToolbar";
import B011CreateButtonContainer from "../B011CreateButtonContainer";
import { B011FetchResultLabelContainer } from "../B011FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<B011CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const B011ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
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

