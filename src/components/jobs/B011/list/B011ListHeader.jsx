import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import B011IdColumn from "./columns/B011IdColumn";
import B011DateColumn from "./columns/B011DateColumn";
import B011UserColumn from "./columns/B011UserColumn";
import B011SupplierColumn from "./columns/B011SupplierColumn";
import B011CustomerColumn from "./columns/B011CustomerColumn";
import B011ProdColumn from "./columns/B011ProdColumn";
import B011PriceColumn from "./columns/B011PriceColumn";

const B011ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<B011CustomerColumn>客戶</B011CustomerColumn>
				<B011ProdColumn>商品</B011ProdColumn>
				<B011PriceColumn>建議售價</B011PriceColumn>
				<B011PriceColumn>客戶報價</B011PriceColumn>
				<B011DateColumn>詢價日期</B011DateColumn>
				<B011UserColumn>詢價人員</B011UserColumn>
			</ListViewHeader>
		);
	})
);

B011ListHeader.propTypes = {};

B011ListHeader.displayName = "B011ListHeader";
export default B011ListHeader;

