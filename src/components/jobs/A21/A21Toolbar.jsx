import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { A21FormButtonsContainer } from "./buttons/A21FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";

const A21Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					bgcolor=""
					ref={ref}
					RightComponent={A21FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A21Toolbar.propTypes = {};

A21Toolbar.displayName = "A21Toolbar";
export default A21Toolbar;
