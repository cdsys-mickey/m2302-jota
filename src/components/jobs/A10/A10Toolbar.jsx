import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A10LockRowsSwitchContainer } from "./A10LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A10PrintButtonContainer from "./A10PrintButtonContainer";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";
import Colors from "../../../modules/Colors.mjs";

const A10Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A10PrintButtonContainer}
					RightComponent={A10LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A10Toolbar.propTypes = {};

A10Toolbar.displayName = "A10Toolbar";
export default A10Toolbar;
