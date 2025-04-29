import Colors from "@/modules/Colors.mjs";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import { F02LockSwitchContainer } from "./F02LockSwitchContainer";
import F02StageButtonContainer from "./F02StageButtonContainer";
import F02DeleteButtonContainer from "./F02DeleteButtonContainer";


const LeftComponent = memo(() => {
	return (
		<>
			<F02StageButtonContainer />
			<F02DeleteButtonContainer />
		</>
	);
})

LeftComponent.propTypes = {

}

LeftComponent.displayName = "LeftComponent";


const F02Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					bgcolor={Colors.TOOLBAR}
					ref={ref}
					LeftComponent={LeftComponent}
					RightComponent={F02LockSwitchContainer}
					mb={0.5}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

F02Toolbar.propTypes = {};

F02Toolbar.displayName = "F02Toolbar";
export default F02Toolbar;


