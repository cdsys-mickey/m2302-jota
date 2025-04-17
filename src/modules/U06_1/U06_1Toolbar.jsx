import ContainerEx from "@/shared-components/ContainerEx";
import { forwardRef, memo } from "react";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { U06_1FormButtonsContainer } from "./buttons/U06_1FormButtonsContainer";

const U06_1Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
					ref={ref}
					RightComponent={U06_1FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

U06_1Toolbar.propTypes = {};

U06_1Toolbar.displayName = "U061Toolbar";
export default U06_1Toolbar;




