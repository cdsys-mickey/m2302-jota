import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A26LockRowsSwitchContainer } from "./A26LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A26PrintButtonContainer from "./A26PrintButtonContainer";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";
import Colors from "../../../modules/Colors.mjs";
import { A26LockSwitchContainer } from "./A26LockSwitchContainer";

const LeftButtons = memo(() => {
	return (
		<>
			<A26PrintButtonContainer />
			<A26LockSwitchContainer />
		</>
	);
});
LeftButtons.displayName = "LeftButtons";

const A26Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={LeftButtons}
					RightComponent={A26LockRowsSwitchContainer}
					// right={<Switch />}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A26Toolbar.propTypes = {};

A26Toolbar.displayName = "A26Toolbar";
export default A26Toolbar;
