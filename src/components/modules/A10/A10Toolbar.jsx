import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A10LockRowsSwitchContainer } from "./A10LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A10PrintButtonContainer from "./A10PrintButtonContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const A10Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<FlexToolbar
					ref={ref}
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
