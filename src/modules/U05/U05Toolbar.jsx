import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U05FormButtonsContainer } from "./buttons/U05FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexToolbar from "../../shared-components/listview/toolbar/FlexToolbar";

const U05Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<FlexToolbar
					ref={ref}
					RightComponent={U05FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U05Toolbar.propTypes = {};

U05Toolbar.displayName = "U05Toolbar";
export default U05Toolbar;


