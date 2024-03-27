import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A16LockRowsSwitchContainer } from "./A16LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A16PrintButtonContainer from "./A16PrintButtonContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const A16Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="md" alignLeft>
				<FlexToolbar
					ref={ref}
					LeftComponent={A16PrintButtonContainer}
					RightComponent={A16LockRowsSwitchContainer}
					// right={<Switch />}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A16Toolbar.propTypes = {};

A16Toolbar.displayName = "A16Toolbar";
export default A16Toolbar;
