import { forwardRef, memo } from "react";
import Colors from "@/modules/Colors.mjs";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { P33LockRowsSwitchContainer } from "./P33LockRowsSwitchContainer";
import P33PrintButtonContainer from "./P33PrintButtonContainer";

const P33Toolbar = memo(
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
					// 		<P33PrintButtonContainer />
					// 		<P33LockRowsSwitchContainer />
					// 	</>
					// }
					LeftComponent={P33PrintButtonContainer}
					RightComponent={P33LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

P33Toolbar.propTypes = {};

P33Toolbar.displayName = "P33Toolbar";
export default P33Toolbar;




