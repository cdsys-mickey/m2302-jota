import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U08FormButtonsContainer } from "./buttons/U08FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "../../shared-components/ToolbarEx/ToolbarEx";

const U08Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ToolbarEx
					ref={ref}
					RightComponent={U08FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U08Toolbar.propTypes = {};

U08Toolbar.displayName = "U08Toolbar";
export default U08Toolbar;




