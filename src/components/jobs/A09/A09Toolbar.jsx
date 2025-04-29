import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A09LockRowsSwitchContainer } from "./A09LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A09PrintButtonContainer from "./A09PrintButtonContainer";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";
import Colors from "../../../modules/Colors.mjs";

const A09Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ListToolbar
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A09PrintButtonContainer}
					RightComponent={A09LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A09Toolbar.propTypes = {};

A09Toolbar.displayName = "A09Toolbar";
export default A09Toolbar;
