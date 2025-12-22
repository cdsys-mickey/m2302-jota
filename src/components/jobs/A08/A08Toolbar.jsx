import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container, Grid } from "@mui/material";
import { forwardRef, memo } from "react";
import { A08LockSwitchContainer } from "./A08LockSwitchContainer";
import A08PrintButtonContainer from "./A08PrintButtonContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";
import Colors from "../../../modules/Colors.mjs";

const A08Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					bgcolor={Colors.TOOLBAR}
					ref={ref}
					LeftComponent={A08PrintButtonContainer}
					RightComponent={A08LockSwitchContainer}
					mb={0.5}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A08Toolbar.propTypes = {};

A08Toolbar.displayName = "A08Toolbar";
export default A08Toolbar;
