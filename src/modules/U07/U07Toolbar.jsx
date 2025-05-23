import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { U07FormButtonsContainer } from "./buttons/U07FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";

const U07Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={U07FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U07Toolbar.propTypes = {};

U07Toolbar.displayName = "U07Toolbar";
export default U07Toolbar;




