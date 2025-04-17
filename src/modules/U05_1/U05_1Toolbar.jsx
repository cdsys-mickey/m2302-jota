import ContainerEx from "@/shared-components/ContainerEx";
import { forwardRef, memo } from "react";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { U05_1FormButtonsContainer as U05_1FormButtonsContainer } from "./buttons/U05_1FormButtonsContainer";

const U05_1Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={U05_1FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U05_1Toolbar.propTypes = {};

U05_1Toolbar.displayName = "U051Toolbar";
export default U05_1Toolbar;



