import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U061FormButtonsContainer } from "./buttons/U061FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const U061Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<FlexToolbar
					ref={ref}
					RightComponent={U061FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U061Toolbar.propTypes = {};

U061Toolbar.displayName = "U061Toolbar";
export default U061Toolbar;




