import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import P41IDColumn from "./columns/P41IDColumn";
import P41NameColumn from "./columns/P41NameColumn";
import P41BankColumn from "./columns/P41BankColumn";
import P41GuideNameColumn from "./columns/P41GuideNameColumn";
import P41DateColumn from "./columns/P41DateColumn";
import P41FlagColumn from "./columns/P41FlagColumn";
import P41CmsColumn from "./columns/P41CmsColumn";

const P41ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<P41IDColumn>預約單號</P41IDColumn>
				<P41DateColumn>訂訪日</P41DateColumn>
				<P41DateColumn>到訪日</P41DateColumn>
				<P41NameColumn>名稱</P41NameColumn>
				{/* <P41GuideNameColumn>導遊</P41GuideNameColumn> */}
				<P41BankColumn>車行</P41BankColumn>
				<P41BankColumn>旅行社</P41BankColumn>
				<P41FlagColumn>車數</P41FlagColumn>
				<P41FlagColumn>結清</P41FlagColumn>
				<P41CmsColumn>佣金單號</P41CmsColumn>
			</ListViewHeader>
		);
	})
);

P41ListHeader.propTypes = {};

P41ListHeader.displayName = "P41ListHeader";
export default P41ListHeader;



