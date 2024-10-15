import { forwardRef, memo } from "react";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import E021CreateButtonContainer from "../E021CreateButtonContainer";
import { E021FetchResultLabelContainer } from "../E021FetchResultLabelContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<E021CreateButtonContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const E021ListToolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				// pb={1}
				pl={0}
				pr={1}
				alignItems="flex-end"
				ref={ref}
				LeftComponent={LeftButtons}
				RightComponent={E021FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

E021ListToolbar.displayName = "E021ListViewToolbar";
export default E021ListToolbar;



