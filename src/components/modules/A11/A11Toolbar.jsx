import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A11LockRowsSwitchContainer } from "./A11LockRowsSwitchContainer";
import A11PrintButtonContainer from "./A11PrintButtonContainer";
import ContainerEx from "../../../shared-components/ContainerEx";

const A11Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A11LockRowsSwitchContainer}
					RightComponent={A11PrintButtonContainer}
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
