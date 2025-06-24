import { forwardRef, memo } from "react";
import Colors from "@/modules/Colors.mjs";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { P13LockRowsSwitchContainer } from "./P13LockRowsSwitchContainer";
import P13PrintButtonContainer from "./P13PrintButtonContainer";

const P13Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ListToolbar
					borderRadius={1}
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					// leftComponents={
					// 	<>
					// 		<P13PrintButtonContainer />
					// 		<P13LockRowsSwitchContainer />
					// 	</>
					// }
					LeftComponent={P13PrintButtonContainer}
					RightComponent={P13LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

P13Toolbar.propTypes = {};

P13Toolbar.displayName = "P13Toolbar";
export default P13Toolbar;

