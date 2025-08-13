import InlineListViewToolbar from "@/shared-components/listview/toolbar/InlineListViewToolbar";
import { forwardRef, memo } from "react";
import { REBFormButtonsContainer } from "./buttons/REBFormButtonsContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import ListToolbar from "../../shared-components/listview/toolbar/ListToolbar";
import REBCarryForwardButtonContainer from "./tabs/sales-data/REBSalesRebuildButtonContainer";
import Colors from "../Colors.mjs";
import REBRestoreButtonContainer from "./tabs/pos-data/REBPosRebuildButtonContainer";

const REBToolbar = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ContainerEx maxWidth="xs" alignLeft>
				<ListToolbar
					ref={ref}
					bgcolor={Colors.TOOLBAR}
					LeftComponent={REBCarryForwardButtonContainer}
					RightComponent={REBRestoreButtonContainer}
					{...rest}
				/>
			</ContainerEx>
		);
	})
);

REBToolbar.propTypes = {};

REBToolbar.displayName = "REBToolbar";
export default REBToolbar;









