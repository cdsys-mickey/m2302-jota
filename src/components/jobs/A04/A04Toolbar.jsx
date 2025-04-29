import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A04LockSwitchContainer } from "./A04LockSwitchContainer";
import A04PrintButtonContainer from "./A04PrintButtonContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";
import Colors from "../../../modules/Colors.mjs";

const A04Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					// leftComponents={
					// 	<>
					// 		<A04PrintButtonContainer />
					// 		<A04LockSwitchContainer />
					// 	</>
					// }
					LeftComponent={A04PrintButtonContainer}
					RightComponent={A04LockSwitchContainer}
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
