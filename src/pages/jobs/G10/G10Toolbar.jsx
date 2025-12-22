import Colors from "@/modules/Colors.mjs";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import G10WriteOffButtonContainer from "./G10WriteOffButton/G10WriteOffButtonContainer";

const LeftComponent = memo(() => {
	return (
		<>
			<G10WriteOffButtonContainer />
		</>
	);
})

LeftComponent.propTypes = {

}

LeftComponent.displayName = "LeftComponent";


const G10Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="md" alignLeft>
				<ToolbarEx
					bgcolor={Colors.TOOLBAR}
					ref={ref}
					LeftComponent={LeftComponent}
					// RightComponent={G10LockSwitchContainer}
					mb={0.5}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

G10Toolbar.propTypes = {};

G10Toolbar.displayName = "G10Toolbar";
export default G10Toolbar;





