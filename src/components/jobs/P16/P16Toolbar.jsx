import { forwardRef, memo } from "react";
import Colors from "@/modules/Colors.mjs";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { P16LockSwitchContainer } from "./P16LockSwitchContainer";

const P16Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ToolbarEx
					bgcolor={Colors.TOOLBAR}
					ref={ref}
					// LeftComponent={P16PrintButtonContainer}
					RightComponent={P16LockSwitchContainer}
					mb={0.5}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

P16Toolbar.propTypes = {};

P16Toolbar.displayName = "P16Toolbar";
export default P16Toolbar;

