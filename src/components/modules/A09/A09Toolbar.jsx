import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A09LockRowsSwitchContainer } from "./A09LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A09PrintButtonContainer from "./A09PrintButtonContainer";

const A09Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A09LockRowsSwitchContainer}
					RightComponent={A09PrintButtonContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A09Toolbar.propTypes = {};

A09Toolbar.displayName = "A09Toolbar";
export default A09Toolbar;
