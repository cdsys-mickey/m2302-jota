import { forwardRef, memo } from "react";
import Colors from "@/modules/Colors.mjs";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { P32LockRowsSwitchContainer } from "./P32LockRowsSwitchContainer";
import P32PrintButtonContainer from "./P32PrintButtonContainer";

const P32Toolbar = memo(
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
					// 		<P32PrintButtonContainer />
					// 		<P32LockRowsSwitchContainer />
					// 	</>
					// }
					LeftComponent={P32PrintButtonContainer}
					RightComponent={P32LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

P32Toolbar.propTypes = {};

P32Toolbar.displayName = "P32Toolbar";
export default P32Toolbar;



