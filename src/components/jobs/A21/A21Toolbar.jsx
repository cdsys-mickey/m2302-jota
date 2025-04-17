import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { A21FormButtonsContainer } from "./buttons/A21FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";

const A21Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ListToolbar
					bgcolor=""
					ref={ref}
					RightComponent={A21FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A21Toolbar.propTypes = {};

A21Toolbar.displayName = "A21Toolbar";
export default A21Toolbar;
