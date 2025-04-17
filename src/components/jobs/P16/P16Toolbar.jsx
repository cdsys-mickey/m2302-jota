import { forwardRef, memo } from "react";
import Colors from "@/modules/md-colors";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { P16LockSwitchContainer } from "./P16LockSwitchContainer";

const P16Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="sm" alignLeft>
				<ListToolbar
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

