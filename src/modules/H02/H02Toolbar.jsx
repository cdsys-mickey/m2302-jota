import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { H02FormButtonsContainer } from "./buttons/H02FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";

const H02Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={H02FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

H02Toolbar.propTypes = {};

H02Toolbar.displayName = "H02Toolbar";
export default H02Toolbar;



