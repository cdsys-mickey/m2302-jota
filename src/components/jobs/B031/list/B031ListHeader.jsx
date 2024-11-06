import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import B031IdColumn from "./columns/B031IdColumn";
import B031DateColumn from "./columns/B031DateColumn";
import B031UserColumn from "./columns/B031UserColumn";
import B031SupplierColumn from "./columns/B031SupplierColumn";
import B031CustomerColumn from "./columns/B031CustomerColumn";
import B031ProdColumn from "./columns/B031ProdColumn";
import B031PriceColumn from "./columns/B031PriceColumn";

const B031ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<B031CustomerColumn>客戶</B031CustomerColumn>
				<B031ProdColumn>商品</B031ProdColumn>
				<B031PriceColumn>建議售價</B031PriceColumn>
				<B031PriceColumn>客戶報價</B031PriceColumn>
				<B031DateColumn>報價日期</B031DateColumn>
				<B031UserColumn>報價人員</B031UserColumn>
			</ListViewHeader>
		);
	})
);

B031ListHeader.propTypes = {};

B031ListHeader.displayName = "B031ListHeader";
export default B031ListHeader;


