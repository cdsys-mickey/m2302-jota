import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import P35IDColumn from "./columns/P35IDColumn";
import P35NameColumn from "./columns/P35NameColumn";
import P35BankColumn from "./columns/P35BankColumn";

const P35ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<P35IDColumn>代碼</P35IDColumn>
				<P35NameColumn>名稱</P35NameColumn>
				<P35BankColumn>簡碼</P35BankColumn>
			</ListViewHeader>
		);
	})
);

P35ListHeader.propTypes = {};

P35ListHeader.displayName = "P35ListHeader";
export default P35ListHeader;


