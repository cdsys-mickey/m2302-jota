import Colors from "@/modules/Colors.mjs";
import { forwardRef, memo } from "react";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import F07CloseButtonContainer from "./F07CloseButtonContainer";
import F07RestoreButtonContainer from "./F07RestoreButtonContainer";

const F07Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ListToolbar
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={F07CloseButtonContainer}
					RightComponent={F07RestoreButtonContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

F07Toolbar.propTypes = {};

F07Toolbar.displayName = "F07Toolbar";
export default F07Toolbar;

