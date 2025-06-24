import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import P41IDColumn from "./columns/P41IDColumn";
import P41NameColumn from "./columns/P41NameColumn";
import P41BankColumn from "./columns/P41BankColumn";

const P41ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<P41IDColumn>代碼</P41IDColumn>
				<P41NameColumn>名稱</P41NameColumn>
				<P41BankColumn>銀行</P41BankColumn>
			</ListViewHeader>
		);
	})
);

P41ListHeader.propTypes = {};

P41ListHeader.displayName = "P41ListHeader";
export default P41ListHeader;



