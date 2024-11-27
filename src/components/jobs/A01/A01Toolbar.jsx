import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { forwardRef, memo } from "react";
import A01CreateButtonContainer from "./A01CreateButtonContainer";
import { A01FetchResultLabelContainer } from "./A01FetchResultLabelContainer";
import A01PrintButtonContainer from "./A01PrintButtonContainer";
import { A01LockSwitchContainer } from "./A01LockSwitchContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<A01CreateButtonContainer />
			<A01PrintButtonContainer color="neutral" />
			<A01LockSwitchContainer />
		</>
	);
});

LeftButtons.displayName = "LeftButtons";

const A01Toolbar = memo(
	forwardRef(({ ...rest }, ref) => {
		return (
			<FlexToolbar
				// pb={1}
				alignItems="flex-end"
				pr={1}
				ref={ref}
				LeftComponent={LeftButtons}
				// RightComponent={() => <FetchResultLabel totalElements={365} />}
				RightComponent={A01FetchResultLabelContainer}
				{...rest}
			/>
		);
	})
);

A01Toolbar.displayName = "A01ListViewToolbar";
export default A01Toolbar;
