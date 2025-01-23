import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import A05IDColumn from "./columns/A05IDColumn";
import A05NameColumn from "./columns/A05NameColumn";
import A05BankColumn from "./columns/A05BankColumn";

const A05ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<A05IDColumn>代碼</A05IDColumn>
				<A05NameColumn>名稱</A05NameColumn>
				<A05BankColumn>銀行</A05BankColumn>
			</ListViewHeader>
		);
	})
);

A05ListHeader.propTypes = {};

A05ListHeader.displayName = "A05ListHeader";
export default A05ListHeader;
