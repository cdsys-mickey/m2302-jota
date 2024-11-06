import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import B011CustomerColumn from "./columns/B011CustomerColumn";
import B011DateColumn from "./columns/B011DateColumn";
import B011PriceColumn from "./columns/B011PriceColumn";
import B011ProdColumn from "./columns/B011ProdColumn";
import B011UserColumn from "./columns/B011UserColumn";
import { BContext } from "@/contexts/B/BContext";
import { useContext } from "react";
import { useMemo } from "react";

const B011ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b = useContext(BContext);

		const cust = useMemo(() => {
			return b.forNew ? "新客戶" : "客戶"
		}, [b.forNew])

		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<B011CustomerColumn>{cust}</B011CustomerColumn>
				<B011ProdColumn>商品</B011ProdColumn>
				<B011PriceColumn>建議售價</B011PriceColumn>
				<B011PriceColumn>{cust}報價</B011PriceColumn>
				<B011DateColumn>報價日期</B011DateColumn>
				<B011UserColumn>報價人員</B011UserColumn>
			</ListViewHeader>
		);
	})
);

B011ListHeader.propTypes = {};

B011ListHeader.displayName = "B011ListHeader";
export default B011ListHeader;

