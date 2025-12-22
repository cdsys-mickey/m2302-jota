import Colors from "@/modules/Colors.mjs";
import ContainerEx from "@/shared-components/ContainerEx";
import ToolbarEx from "@/shared-components/ToolbarEx/ToolbarEx";
import { forwardRef, memo } from "react";
import { A17FormButtonsContainer } from "./buttons/A17FormButtonsContainer";

const A17Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ToolbarEx
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={A17FormButtonsContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

A17Toolbar.propTypes = {};

A17Toolbar.displayName = "A17Toolbar";
export default A17Toolbar;
