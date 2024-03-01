import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A16LockRowsSwitchContainer } from "./A16LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A16PrintButtonContainer from "./A16PrintButtonContainer";

const A16Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="md" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A16LockRowsSwitchContainer}
					// RightComponent={A16PrintButtonContainer}
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
