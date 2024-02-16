import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A04LockRowsSwitchContainer } from "./A04LockRowsSwitchContainer";
import A04PrintButtonContainer from "./A04PrintButtonContainer";
import ContainerEx from "../../../shared-components/ContainerEx";

const A04Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A04LockRowsSwitchContainer}
					RightComponent={A04PrintButtonContainer}
					mb={0.5}
					// right={<Switch />}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A04Toolbar.propTypes = {};

A04Toolbar.displayName = "A04Toolbar";
export default A04Toolbar;
