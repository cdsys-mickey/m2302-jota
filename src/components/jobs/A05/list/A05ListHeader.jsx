import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import A05IDColumn from "./columns/A05IDColumn";
import A05NameColumn from "./columns/A05NameColumn";

const A05ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<A05IDColumn>代碼</A05IDColumn>
				<A05NameColumn>名稱</A05NameColumn>
				<A05NameColumn>銀行</A05NameColumn>
			</ListViewHeader>
		);
	})
);

A05ListHeader.propTypes = {};

A05ListHeader.displayName = "A05ListHeader";
export default A05ListHeader;
