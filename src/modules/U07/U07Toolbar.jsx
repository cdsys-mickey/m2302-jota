import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U07FormButtonsContainer } from "./buttons/U07FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "../../shared-components/ToolbarEx/ToolbarEx";

const U07Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ToolbarEx
					ref={ref}
					RightComponent={U07FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U07Toolbar.propTypes = {};

U07Toolbar.displayName = "U07Toolbar";
export default U07Toolbar;




