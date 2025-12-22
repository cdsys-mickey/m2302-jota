import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A11LockRowsSwitchContainer } from "./A11LockRowsSwitchContainer";
import A11PrintButtonContainer from "./A11PrintButtonContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";
import Colors from "../../../modules/Colors.mjs";

const A11Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A11PrintButtonContainer}
					RightComponent={A11LockRowsSwitchContainer}
					mb={0.5}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A11Toolbar.propTypes = {};

A11Toolbar.displayName = "A11Toolbar";
export default A11Toolbar;
