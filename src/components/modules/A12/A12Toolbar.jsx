import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import ContainerEx from "../../../shared-components/ContainerEx";
import { A12LockRowsSwitchContainer } from "./A12LockRowsSwitchContainer";
import A12PrintButtonContainer from "./A12PrintButtonContainer";

const A12Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<InlineListViewToolbar
					ref={ref}
					LeftComponent={A12LockRowsSwitchContainer}
					RightComponent={A12PrintButtonContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A12Toolbar.propTypes = {};

A12Toolbar.displayName = "A12Toolbar";
export default A12Toolbar;
