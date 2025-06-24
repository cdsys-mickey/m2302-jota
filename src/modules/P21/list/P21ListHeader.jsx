import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import P21IDColumn from "./columns/P21IDColumn";
import P21NameColumn from "./columns/P21NameColumn";
import P21BankColumn from "./columns/P21BankColumn";

const P21ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<P21IDColumn>代碼</P21IDColumn>
				<P21NameColumn>名稱</P21NameColumn>
				<P21BankColumn>銀行</P21BankColumn>
			</ListViewHeader>
		);
	})
);

P21ListHeader.propTypes = {};

P21ListHeader.displayName = "P21ListHeader";
export default P21ListHeader;


