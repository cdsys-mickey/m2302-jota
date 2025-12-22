import { forwardRef, memo } from "react";
import Colors from "../../../modules/Colors.mjs";
import ContainerEx from "../../../shared-components/ContainerEx";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";
import { A16GLockRowsSwitchContainer } from "./A16GLockRowsSwitchContainer";
import A16GPrintButtonContainer from "./A16GPrintButtonContainer";

const A16GToolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="md" alignLeft>
				<ToolbarEx
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A16GPrintButtonContainer}
					RightComponent={A16GLockRowsSwitchContainer}
					// right={<Switch />}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A16GToolbar.propTypes = {};

A16GToolbar.displayName = "A16GToolbar";
export default A16GToolbar;

