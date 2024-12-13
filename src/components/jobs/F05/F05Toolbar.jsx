import { forwardRef, memo } from "react";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import F05CloseButtonContainer from "./F05CloseButtonContainer";
import Colors from "@/modules/md-colors";

const F05Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<FlexToolbar
					bgcolor={Colors.TOOLBAR}
					ref={ref}
					LeftComponent={F05CloseButtonContainer}
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

