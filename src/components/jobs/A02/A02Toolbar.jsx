import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { Container } from "@mui/material";
import { forwardRef, memo } from "react";
import { A02LockRowsSwitchContainer } from "./A02LockRowsSwitchContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import A02PrintButtonContainer from "./A02PrintButtonContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";
import Colors from "../../../modules/md-colors";

const A02Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<FlexToolbar
					borderRadius={1}
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					// leftComponents={
					// 	<>
					// 		<A02PrintButtonContainer />
					// 		<A02LockRowsSwitchContainer />
					// 	</>
					// }
					LeftComponent={A02PrintButtonContainer}
					RightComponent={A02LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A02Toolbar.propTypes = {};

A02Toolbar.displayName = "A02Toolbar";
export default A02Toolbar;