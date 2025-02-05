import Colors from "@/modules/md-colors";
import { forwardRef, memo } from "react";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import F07CloseButtonContainer from "./F07ClosrButtonContainer";

const F07Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<FlexToolbar
					bgcolor={Colors.TOOLBAR}
					ref={ref}
					LeftComponent={F07CloseButtonContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

F07Toolbar.propTypes = {};

F07Toolbar.displayName = "F07Toolbar";
export default F07Toolbar;

