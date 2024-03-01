import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import MsgIDColumn from "../columns/MsgIDColumn";
import MsgNameColumn from "../columns/MsgNameColumn";
import MsgTimeColumn from "../columns/MsgTimeColumn";
import MsgJobColumn from "../columns/MsgJobColumn";

const MsgListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<MsgIDColumn>來自</MsgIDColumn>
				<MsgJobColumn>作業</MsgJobColumn>
				<MsgNameColumn>內容</MsgNameColumn>
				<MsgTimeColumn>發送時間</MsgTimeColumn>
			</ListViewHeader>
		);
	})
);

MsgListHeader.propTypes = {};

MsgListHeader.displayName = "MsgListHeader";
export default MsgListHeader;
