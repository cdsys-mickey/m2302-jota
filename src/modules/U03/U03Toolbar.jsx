import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U03FormButtonsContainer } from "./buttons/U03FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexToolbar from "../../shared-components/listview/toolbar/FlexToolbar";

const U03Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<FlexToolbar
					ref={ref}
					RightComponent={U03FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U03Toolbar.propTypes = {};

U03Toolbar.displayName = "U03Toolbar";
export default U03Toolbar;



