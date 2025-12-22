import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import ContainerEx from "../../../shared-components/ContainerEx";
import { A13LockRowsSwitchContainer } from "./A13LockRowsSwitchContainer";
import A13PrintButtonContainer from "./A13PrintButtonContainer";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";
import Colors from "../../../modules/Colors.mjs";

const A13Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A13PrintButtonContainer}
					RightComponent={A13LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A13Toolbar.propTypes = {};

A13Toolbar.displayName = "A13Toolbar";
export default A13Toolbar;
