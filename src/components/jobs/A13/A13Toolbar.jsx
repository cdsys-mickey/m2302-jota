import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import ContainerEx from "../../../shared-components/ContainerEx";
import { A13LockRowsSwitchContainer } from "./A13LockRowsSwitchContainer";
import A13PrintButtonContainer from "./A13PrintButtonContainer";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";
import Colors from "../../../modules/md-colors";

const A13Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ListToolbar
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A13PrintButtonContainer}
					RightComponent={A13LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A13Toolbar.propTypes = {};

A13Toolbar.displayName = "A13Toolbar";
export default A13Toolbar;
