import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U051FormButtonsContainer } from "./buttons/U051FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const U051Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<FlexToolbar
					ref={ref}
					RightComponent={U051FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U051Toolbar.propTypes = {};

U051Toolbar.displayName = "U051Toolbar";
export default U051Toolbar;



