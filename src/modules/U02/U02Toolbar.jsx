import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U02FormButtonsContainer } from "./buttons/U02FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexToolbar from "../../shared-components/listview/toolbar/FlexToolbar";

const U02Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<FlexToolbar
					ref={ref}
					RightComponent={U02FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U02Toolbar.propTypes = {};

U02Toolbar.displayName = "U02Toolbar";
export default U02Toolbar;



