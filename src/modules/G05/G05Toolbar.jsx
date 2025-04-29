import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { G05FormButtonsContainer } from "./buttons/G05FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";

const G05Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={G05FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

G05Toolbar.propTypes = {};

G05Toolbar.displayName = "G05Toolbar";
export default G05Toolbar;





