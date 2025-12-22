import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { F06FormButtonsContainer } from "./buttons/F06FormButtonsContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";

const F06Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					ref={ref}
					RightComponent={F06FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

F06Toolbar.propTypes = {};

F06Toolbar.displayName = "F06Toolbar";
export default F06Toolbar;

