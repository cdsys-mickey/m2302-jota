import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { G09FormButtonsContainer } from "./buttons/G09FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "../../shared-components/ToolbarEx/ToolbarEx";

const G09Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ToolbarEx
					ref={ref}
					RightComponent={G09FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

G09Toolbar.propTypes = {};

G09Toolbar.displayName = "G09Toolbar";
export default G09Toolbar;






