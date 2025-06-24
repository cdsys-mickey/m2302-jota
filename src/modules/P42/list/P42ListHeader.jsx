import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import P42IDColumn from "./columns/P42IDColumn";
import P42NameColumn from "./columns/P42NameColumn";
import P42BankColumn from "./columns/P42BankColumn";

const P42ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<P42IDColumn>代碼</P42IDColumn>
				<P42NameColumn>名稱</P42NameColumn>
				<P42BankColumn>銀行</P42BankColumn>
			</ListViewHeader>
		);
	})
);

P42ListHeader.propTypes = {};

P42ListHeader.displayName = "P42ListHeader";
export default P42ListHeader;



