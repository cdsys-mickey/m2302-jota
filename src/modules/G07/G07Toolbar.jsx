import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { G07FormButtonsContainer } from "./buttons/G07FormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";
import G07CarryForwardButtonContainer from "./tabs/carry/G07CarryForwardButtonContainer";
import Colors from "../Colors.mjs";
import G07RestoreButtonContainer from "./tabs/restore/G07RestoreButtonContainer";

const G07Toolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ListToolbar
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={G07CarryForwardButtonContainer}
					RightComponent={G07RestoreButtonContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

G07Toolbar.propTypes = {};

G07Toolbar.displayName = "G07Toolbar";
export default G07Toolbar;








