import ContainerEx from "@/shared-components/ContainerEx";
import { forwardRef, memo } from "react";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { U05_1FormButtonsContainer as U05_1FormButtonsContainer } from "./buttons/U05_1FormButtonsContainer";

const U05_1Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ToolbarEx
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



