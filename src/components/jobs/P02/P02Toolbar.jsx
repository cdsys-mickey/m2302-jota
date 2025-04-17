import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { P02FormButtonsContainer } from "./buttons/P02FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../../shared-components/listview/toolbar/ListToolbar";

const P02Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={P02FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

P02Toolbar.propTypes = {};

P02Toolbar.displayName = "P02Toolbar";
export default P02Toolbar;

