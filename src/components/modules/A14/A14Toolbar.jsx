import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import ContainerEx from "../../../shared-components/ContainerEx";
import { A14LockRowsSwitchContainer } from "./A14LockRowsSwitchContainer";
import A14PrintButtonContainer from "./A14PrintButtonContainer";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";
import Colors from "../../../modules/md-colors";

const A14Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<FlexToolbar
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A14PrintButtonContainer}
					RightComponent={A14LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A14Toolbar.propTypes = {};

A14Toolbar.displayName = "A14Toolbar";
export default A14Toolbar;
