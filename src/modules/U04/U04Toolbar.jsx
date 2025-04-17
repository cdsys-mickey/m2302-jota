import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U04FormButtonsContainer } from "./buttons/U04FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";

const U04Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
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



