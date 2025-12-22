import { forwardRef, memo } from "react";
import Colors from "@/modules/Colors.mjs";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { P31LockRowsSwitchContainer } from "./P31LockRowsSwitchContainer";
import P31PrintButtonContainer from "./P31PrintButtonContainer";

const P31Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					borderRadius={1}
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					// leftComponents={
					// 	<>
					// 		<P31PrintButtonContainer />
					// 		<P31LockRowsSwitchContainer />
					// 	</>
					// }
					LeftComponent={P31PrintButtonContainer}
					RightComponent={P31LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

P31Toolbar.propTypes = {};

P31Toolbar.displayName = "P31Toolbar";
export default P31Toolbar;


