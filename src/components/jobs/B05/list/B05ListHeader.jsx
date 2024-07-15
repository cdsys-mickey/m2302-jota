import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import B05IdColumn from "./columns/B05IdColumn";
import B05DateColumn from "./columns/B05DateColumn";
import B05UserColumn from "./columns/B05UserColumn";
import B05SupplierColumn from "./columns/B05SupplierColumn";

const B05ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<B05IdColumn>詢價單號</B05IdColumn>
				<B05DateColumn>詢價日期</B05DateColumn>
				<B05SupplierColumn>廠商名稱</B05SupplierColumn>
				<B05UserColumn>詢價人員</B05UserColumn>
			</ListViewHeader>
		);
	})
);

B05ListHeader.propTypes = {};

B05ListHeader.displayName = "B05ListHeader";
export default B05ListHeader;
