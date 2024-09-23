import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import B012IdColumn from "./columns/B012IdColumn";
import B012DateColumn from "./columns/B012DateColumn";
import B012UserColumn from "./columns/B012UserColumn";
import B012SupplierColumn from "./columns/B012SupplierColumn";
import B012CustomerColumn from "./columns/B012CustomerColumn";
import B012ProdColumn from "./columns/B012ProdColumn";
import B012PriceColumn from "./columns/B012PriceColumn";

const B012ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<B012ProdColumn>商品</B012ProdColumn>
				<B012CustomerColumn>客戶</B012CustomerColumn>
				<B012PriceColumn>建議售價</B012PriceColumn>
				<B012PriceColumn>客戶報價</B012PriceColumn>
				<B012DateColumn>詢價日期</B012DateColumn>
				<B012UserColumn>詢價人員</B012UserColumn>
			</ListViewHeader>
		);
	})
);

B012ListHeader.propTypes = {};

B012ListHeader.displayName = "B012ListHeader";
export default B012ListHeader;


