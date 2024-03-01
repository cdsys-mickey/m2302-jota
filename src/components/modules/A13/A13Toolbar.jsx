import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import ContainerEx from "../../../shared-components/ContainerEx";
import { A13LockRowsSwitchContainer } from "./A13LockRowsSwitchContainer";
import A13PrintButtonContainer from "./A13PrintButtonContainer";

const A13Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A13LockRowsSwitchContainer}
					RightComponent={A13PrintButtonContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A13Toolbar.propTypes = {};

A13Toolbar.displayName = "A13Toolbar";
export default A13Toolbar;
