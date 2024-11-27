import { forwardRef, memo } from "react";
import Colors from "../../../modules/md-colors";
import ContainerEx from "../../../shared-components/ContainerEx";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";
import { A16LockRowsSwitchContainer } from "./A16LockRowsSwitchContainer";
import A16PrintButtonContainer from "./A16PrintButtonContainer";

const A16Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="md" alignLeft>
				<FlexToolbar
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A16PrintButtonContainer}
					RightComponent={A16LockRowsSwitchContainer}
					// right={<Switch />}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A16Toolbar.propTypes = {};

A16Toolbar.displayName = "A16Toolbar";
export default A16Toolbar;
