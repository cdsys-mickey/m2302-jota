import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import B04IdColumn from "./columns/B04IdColumn";
import B04DateColumn from "./columns/B04DateColumn";
import B04UserColumn from "./columns/B04UserColumn";
import B04SupplierColumn from "./columns/B04SupplierColumn";
import B04CustomerColumn from "./columns/B04CustomerColumn";
import B04ProdColumn from "./columns/B04ProdColumn";
import B04PriceColumn from "./columns/B04PriceColumn";

const B04ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<B04CustomerColumn>客戶</B04CustomerColumn>
				<B04ProdColumn>商品</B04ProdColumn>
				<B04DateColumn>詢價日期</B04DateColumn>
				<B04PriceColumn>建議售價</B04PriceColumn>
				<B04PriceColumn>客戶報價</B04PriceColumn>
				<B04UserColumn>詢價人員</B04UserColumn>
			</ListViewHeader>
		);
	})
);

B04ListHeader.propTypes = {};

B04ListHeader.displayName = "B04ListHeader";
export default B04ListHeader;



