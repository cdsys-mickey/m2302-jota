import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { A011LockRowsSwitchContainer } from "./A011LockRowsSwitchContainer";
import { A011SaveButtonContainer } from "./A011SaveButtonContainer";
import { A011CancelEditButtonContainer } from "./A011CancelEditButtonContainer";

const A011Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<InlineListViewToolbar
				ref={ref}
				// RightComponent={A011LockRowsSwitchContainer}
				leftComponents={
					<>
						<A011LockRowsSwitchContainer />
					</>
				}
				rightComponents={
					<>
						<A011SaveButtonContainer />
						<A011CancelEditButtonContainer />
					</>
				}
				{...rest}
			/>
		);
	})
);

A011Toolbar.propTypes = {};

A011Toolbar.displayName = "A011Toolbar";
export default A011Toolbar;
