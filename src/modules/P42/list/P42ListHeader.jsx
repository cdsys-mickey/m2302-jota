import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import P42IDColumn from "./columns/P42IDColumn";
import P42GroupNameColumn from "./columns/P42GroupNameColumn";
import P42BankColumn from "./columns/P42BankColumn";
import P42GuideNameColumn from "./columns/P42GuideNameColumn";
import P42DateColumn from "./columns/P42DateColumn";

const P42ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<P42IDColumn>佣金單號</P42IDColumn>
				<P42DateColumn>交易日</P42DateColumn>
				<P42GroupNameColumn>團體名稱</P42GroupNameColumn>
				<P42BankColumn>車行</P42BankColumn>
				<P42BankColumn>旅行社</P42BankColumn>
				<P42GuideNameColumn>導遊</P42GuideNameColumn>
			</ListViewHeader>
		);
	})
);

P42ListHeader.propTypes = {};

P42ListHeader.displayName = "P42ListHeader";
export default P42ListHeader;




