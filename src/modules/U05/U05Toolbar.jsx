import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U05FormButtonsContainer } from "./buttons/U05FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";

const U05Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
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


