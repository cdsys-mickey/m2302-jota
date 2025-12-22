import { forwardRef, memo } from "react";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import F05CarryForwardButtonContainer from "./F05CarryForwardButtonContainer";
import Colors from "@/modules/Colors.mjs";

const F05Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					bgcolor={Colors.TOOLBAR}
					ref={ref}
					LeftComponent={F05CarryForwardButtonContainer}
					mb={0.5}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

F05Toolbar.propTypes = {};

F05Toolbar.displayName = "F05Toolbar";
export default F05Toolbar;

