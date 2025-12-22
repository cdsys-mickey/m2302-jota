import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A15LockRowsSwitchContainer } from "./A15LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A15PrintButtonContainer from "./A15PrintButtonContainer";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";
import Colors from "../../../modules/Colors.mjs";

const A15Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A15PrintButtonContainer}
					RightComponent={A15LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A15Toolbar.propTypes = {};

A15Toolbar.displayName = "A15Toolbar";
export default A15Toolbar;
