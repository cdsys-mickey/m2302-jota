import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { G01FormButtonsContainer } from "./buttons/G01FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "../../shared-components/ToolbarEx/ToolbarEx";

const G01Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ToolbarEx
					ref={ref}
					RightComponent={G01FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

G01Toolbar.propTypes = {};

G01Toolbar.displayName = "G01Toolbar";
export default G01Toolbar;




