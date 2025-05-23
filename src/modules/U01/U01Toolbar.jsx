import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U01FormButtonsContainer } from "./buttons/U01FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";

const U01Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={U01FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U01Toolbar.propTypes = {};

U01Toolbar.displayName = "U01Toolbar";
export default U01Toolbar;


