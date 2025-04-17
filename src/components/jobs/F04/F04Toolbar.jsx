import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { F04FormButtonsContainer } from "./buttons/F04FormButtonsContainer";
import ContainerEx from "../../../shared-components/ContainerEx";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";

const F04Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={F04FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

F04Toolbar.propTypes = {};

F04Toolbar.displayName = "F04Toolbar";
export default F04Toolbar;

