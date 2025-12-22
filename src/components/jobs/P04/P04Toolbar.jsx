import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { P04FormButtonsContainer } from "./buttons/P04FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";

const P04Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ToolbarEx
					ref={ref}
					RightComponent={P04FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

P04Toolbar.propTypes = {};

P04Toolbar.displayName = "P04Toolbar";
export default P04Toolbar;


