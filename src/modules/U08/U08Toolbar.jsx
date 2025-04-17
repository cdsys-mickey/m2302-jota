import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U08FormButtonsContainer } from "./buttons/U08FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";

const U08Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={U08FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U08Toolbar.propTypes = {};

U08Toolbar.displayName = "U08Toolbar";
export default U08Toolbar;




