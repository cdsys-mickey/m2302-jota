import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U04FormButtonsContainer } from "./buttons/U04FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexToolbar from "../../shared-components/listview/toolbar/FlexToolbar";

const U04Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<FlexToolbar
					ref={ref}
					RightComponent={U04FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U04Toolbar.propTypes = {};

U04Toolbar.displayName = "U04Toolbar";
export default U04Toolbar;



