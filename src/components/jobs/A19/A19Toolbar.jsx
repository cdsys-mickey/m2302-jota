import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { A19FormButtonsContainer } from "./buttons/A19FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";

const A19Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={A19FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A19Toolbar.propTypes = {};

A19Toolbar.displayName = "A19Toolbar";
export default A19Toolbar;
