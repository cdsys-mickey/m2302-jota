import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { H01FormButtonsContainer } from "./buttons/H01FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexToolbar from "../../../shared-components/listview/toolbar/FlexToolbar";

const H01Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<FlexToolbar
					ref={ref}
					RightComponent={H01FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

H01Toolbar.propTypes = {};

H01Toolbar.displayName = "H01Toolbar";
export default H01Toolbar;


