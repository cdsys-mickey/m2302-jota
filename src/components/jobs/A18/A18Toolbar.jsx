import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { A18FormButtonsContainer } from "./buttons/A18FormButtonsContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const A18Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<FlexToolbar
					ref={ref}
					RightComponent={A18FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A18Toolbar.propTypes = {};

A18Toolbar.displayName = "A18Toolbar";
export default A18Toolbar;
