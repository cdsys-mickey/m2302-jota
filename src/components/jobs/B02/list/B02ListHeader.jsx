import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import B02IdColumn from "./columns/B02IdColumn";
import B02DateColumn from "./columns/B02DateColumn";
import B02UserColumn from "./columns/B02UserColumn";
import B02SupplierColumn from "./columns/B02SupplierColumn";
import B02CustomerColumn from "./columns/B02CustomerColumn";
import B02ProdColumn from "./columns/B02ProdColumn";
import B02PriceColumn from "./columns/B02PriceColumn";
import { BContext } from "@/contexts/B/BContext";
import { useContext } from "react";
import { useMemo } from "react";

const B02ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b = useContext(BContext)
		const cust = useMemo(() => {
			return b.forNew ? "新客戶" : "客戶"
		}, [b.forNew])
		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<B02CustomerColumn>{cust}</B02CustomerColumn>
				{/* <B02IdColumn>商品編號</B02IdColumn> */}
				<B02ProdColumn>商品名稱</B02ProdColumn>
				{/* <B02PriceColumn>建議售價</B02PriceColumn> */}
				<B02PriceColumn>{cust}報價</B02PriceColumn>
				<B02DateColumn>報價日期</B02DateColumn>
				<B02UserColumn>報價人員</B02UserColumn>
			</ListViewHeader>
		);
	})
);

B02ListHeader.propTypes = {};

B02ListHeader.displayName = "B02ListHeader";
export default B02ListHeader;


