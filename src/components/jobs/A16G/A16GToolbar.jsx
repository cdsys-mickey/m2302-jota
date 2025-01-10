import { forwardRef, memo } from "react";
import Colors from "../../../modules/md-colors";
import ContainerEx from "../../../shared-components/ContainerEx";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";
import { A16GLockRowsSwitchContainer } from "./A16GLockRowsSwitchContainer";
import A16GPrintButtonContainer from "./A16GPrintButtonContainer";

const A16GToolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="md" alignLeft>
				<FlexToolbar
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

