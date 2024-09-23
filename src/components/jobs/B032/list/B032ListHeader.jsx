import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import B032IdColumn from "./columns/B032IdColumn";
import B032DateColumn from "./columns/B032DateColumn";
import B032UserColumn from "./columns/B032UserColumn";
import B032SupplierColumn from "./columns/B032SupplierColumn";
import B032CustomerColumn from "./columns/B032CustomerColumn";
import B032ProdColumn from "./columns/B032ProdColumn";
import B032PriceColumn from "./columns/B032PriceColumn";

const B032ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<B032ProdColumn>商品</B032ProdColumn>
				<B032CustomerColumn>客戶</B032CustomerColumn>
				<B032PriceColumn>建議售價</B032PriceColumn>
				<B032PriceColumn>客戶報價</B032PriceColumn>
				<B032DateColumn>詢價日期</B032DateColumn>
				<B032UserColumn>詢價人員</B032UserColumn>
			</ListViewHeader>
		);
	})
);

B032ListHeader.propTypes = {};

B032ListHeader.displayName = "B032ListHeader";
export default B032ListHeader;



