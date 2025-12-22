import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { F04FormButtonsContainer } from "./buttons/F04FormButtonsContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";

const F04Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					ref={ref}
					RightComponent={F04FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

F04Toolbar.propTypes = {};

F04Toolbar.displayName = "F04Toolbar";
export default F04Toolbar;

