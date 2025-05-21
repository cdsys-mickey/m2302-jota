import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { G07FormButtonsContainer } from "./buttons/G07FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";

const G07Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={G07FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

G07Toolbar.propTypes = {};

G07Toolbar.displayName = "G07Toolbar";
export default G07Toolbar;








