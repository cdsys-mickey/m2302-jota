import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { A19FormButtonsContainer } from "./buttons/A19FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";

const A19Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ToolbarEx
					ref={ref}
					RightComponent={A19FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A19Toolbar.propTypes = {};

A19Toolbar.displayName = "A19Toolbar";
export default A19Toolbar;
