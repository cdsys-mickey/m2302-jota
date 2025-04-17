import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import ContainerEx from "../../../shared-components/ContainerEx";
import { A12LockRowsSwitchContainer } from "./A12LockRowsSwitchContainer";
import A12PrintButtonContainer from "./A12PrintButtonContainer";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";
import Colors from "../../../modules/md-colors";

const A12Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ListToolbar
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A12PrintButtonContainer}
					RightComponent={A12LockRowsSwitchContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A12Toolbar.propTypes = {};

A12Toolbar.displayName = "A12Toolbar";
export default A12Toolbar;
