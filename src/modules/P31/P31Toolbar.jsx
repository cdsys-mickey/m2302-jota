import { forwardRef, memo } from "react";
import Colors from "@/modules/Colors.mjs";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { P31LockRowsSwitchContainer } from "./P31LockRowsSwitchContainer";
import P31PrintButtonContainer from "./P31PrintButtonContainer";

const P31Toolbar = memo(
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


