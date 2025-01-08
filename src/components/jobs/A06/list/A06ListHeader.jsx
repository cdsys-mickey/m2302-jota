import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import A06IDColumn from "./columns/A06IDColumn";
import A06NameColumn from "./columns/A06NameColumn";
import A06EmpColumn from "./columns/A06EmpColumn";
import A06BankColumn from "./columns/A06BankColumn";

const A06ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<A06IDColumn>代碼</A06IDColumn>
				<A06NameColumn>名稱</A06NameColumn>
				<A06EmpColumn>區域</A06EmpColumn>
				<A06EmpColumn>業務員</A06EmpColumn>
				<A06BankColumn>銀行</A06BankColumn>
			</ListViewHeader>
		);
	})
);

A06ListHeader.propTypes = {};

A06ListHeader.displayName = "A06ListHeader";
export default A06ListHeader;
