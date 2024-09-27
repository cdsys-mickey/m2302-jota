import { forwardRef, memo } from "react";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import ModuleToolbar from "../../ModuleToolbar";
import E01CreateButtonContainer from "../E01CreateButtonContainer";
import { E01FetchResultLabelContainer } from "../E01FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<E01CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const E01ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={E01FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

E01ListToolbar.displayName = "E01ListViewToolbar";
export default E01ListToolbar;


