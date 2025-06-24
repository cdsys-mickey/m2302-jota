import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import P34IDColumn from "./columns/P34IDColumn";
import P34NameColumn from "./columns/P34NameColumn";
import P34BankColumn from "./columns/P34BankColumn";

const P34ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<P34IDColumn>代碼</P34IDColumn>
				<P34NameColumn>名稱</P34NameColumn>
				<P34BankColumn>簡碼</P34BankColumn>
			</ListViewHeader>
		);
	})
);

P34ListHeader.propTypes = {};

P34ListHeader.displayName = "P34ListHeader";
export default P34ListHeader;

