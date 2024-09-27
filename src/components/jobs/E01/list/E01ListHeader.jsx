import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import E01CustomerColumn from "./columns/E01CustomerColumn";
import E01DateColumn from "./columns/E01DateColumn";
import E01FlagColumn from "./columns/E01FlagColumn";
import E01IdColumn from "./columns/E01IdColumn";
import E01UserColumn from "./columns/E01UserColumn";

const E01ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<E01IdColumn>訂貨單號</E01IdColumn>
				<E01FlagColumn>結清</E01FlagColumn>
				<E01DateColumn>訂貨日期</E01DateColumn>
				<E01FlagColumn>零售</E01FlagColumn>
				<E01CustomerColumn>客戶</E01CustomerColumn>
				<E01UserColumn>業務人員</E01UserColumn>
			</ListViewHeader>
		);
	})
);

E01ListHeader.propTypes = {};

E01ListHeader.displayName = "E01ListHeader";
export default E01ListHeader;


