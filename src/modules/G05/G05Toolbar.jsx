import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { G05FormButtonsContainer } from "./buttons/G05FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "../../shared-components/ToolbarEx/ToolbarEx";

const G05Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ToolbarEx
					ref={ref}
					RightComponent={G05FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

G05Toolbar.propTypes = {};

G05Toolbar.displayName = "G05Toolbar";
export default G05Toolbar;





