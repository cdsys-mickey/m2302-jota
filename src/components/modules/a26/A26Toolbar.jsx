import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A26LockRowsSwitchContainer } from "./A26LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A26PrintButtonContainer from "./A26PrintButtonContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const A26Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<FlexToolbar
					ref={ref}
					LeftComponent={A26PrintButtonContainer}
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
