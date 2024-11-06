import IndexColumn from "@/shared-components/listview/columns/IndexColumn";
import ListViewHeader from "@/shared-components/listview/header/ListViewHeader";
import { forwardRef, memo } from "react";
import B012CustomerColumn from "./columns/B012CustomerColumn";
import B012DateColumn from "./columns/B012DateColumn";
import B012PriceColumn from "./columns/B012PriceColumn";
import B012ProdColumn from "./columns/B012ProdColumn";
import B012UserColumn from "./columns/B012UserColumn";
import { BContext } from "@/contexts/B/BContext";
import { useContext } from "react";
import { useMemo } from "react";

const B012ListHeader = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const b = useContext(BContext);
		const cust = useMemo(() => {
			return b.forNew ? "新客戶" : "客戶";
		}, [b.forNew])

		return (
			<ListViewHeader ref={ref} {...rest}>
				<IndexColumn></IndexColumn>
				<B012ProdColumn>商品</B012ProdColumn>
				<B012CustomerColumn>{cust}</B012CustomerColumn>
				<B012PriceColumn>{cust}報價</B012PriceColumn>
				<B012DateColumn>報價日期</B012DateColumn>
				<B012UserColumn>報價人員</B012UserColumn>
			</ListViewHeader>
		);
	})
);

B012ListHeader.propTypes = {};

B012ListHeader.displayName = "B012ListHeader";
export default B012ListHeader;


