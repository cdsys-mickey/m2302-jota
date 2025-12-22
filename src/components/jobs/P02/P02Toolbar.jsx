import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { P02FormButtonsContainer } from "./buttons/P02FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "../../../shared-components/ToolbarEx/ToolbarEx";

const P02Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ToolbarEx
					ref={ref}
					RightComponent={P02FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

P02Toolbar.propTypes = {};

P02Toolbar.displayName = "P02Toolbar";
export default P02Toolbar;

