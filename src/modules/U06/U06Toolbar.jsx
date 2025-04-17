import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U06FormButtonsContainer } from "./buttons/U06FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";

const U06Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={U06FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U06Toolbar.propTypes = {};

U06Toolbar.displayName = "U06Toolbar";
export default U06Toolbar;



