import { forwardRef, memo } from "react";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";
import A06CreateButtonContainer from "./A06CreateButtonContainer";
import { A06FetchResultLabelContainer } from "./A06FetchResultLabelContainer";
import { A06LockSwitchContainer } from "./A06LockSwitchContainer";
import A06PrintButtonContainer from "./A06PrintButtonContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<A06CreateButtonContainer />
			<A06PrintButtonContainer />
			<A06LockSwitchContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const A06Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				// pb={1}
				pr={1}
				alignItems="flex-end"
				// bgcolor={Colors.TOOLBAR}
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={A06FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

A06Toolbar.displayName = "A06ListViewToolbar";
export default A06Toolbar;
