import Colors from "@/modules/md-colors";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "@/shared-components/listview/toolbar/ListToolbar";
import { forwardRef, memo } from "react";
import { A17FormButtonsContainer } from "./buttons/A17FormButtonsContainer";

const A17Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ListToolbar
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
