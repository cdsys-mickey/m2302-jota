import { forwardRef, memo } from "react";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import ModuleToolbar from "../../ModuleToolbar";
import B012CreateButtonContainer from "../B012CreateButtonContainer";
import { B012FetchResultLabelContainer } from "../B012FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<B012CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const B012ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={B012FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

B012ListToolbar.displayName = "B012ListViewToolbar";
export default B012ListToolbar;


