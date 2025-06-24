import { memo } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import { useMemo } from "react";
import queryString from "query-string";
import PurchaseOrders from "@/modules/md-purchase-orders";


const PurchaseOrderPicker = memo((props) => {
	const { label = "請購單", ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 10000,
			opts: 1
		};
		return queryString.stringify(obj);
	}, [
	]);


	return (
		<OptionPicker
			label={label}
			url={`v1/purchase/orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={PurchaseOrders.getOptionLabel}
			isOptionEqualToValue={PurchaseOrders.isOptionEqualToValue}
			renderOptionLabel={PurchaseOrders.renderOptionLabel}
			// getTitle={PurchaseOrders.renderOptionLabel}
			// stringify={stringify}
			notFoundText="採購單號 ${input} 不存在"
			placeholder="採購單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			// blurToLookup
			{...rest}
		/>
	);
})

PurchaseOrderPicker.propTypes = {
	label: PropTypes.string
}

PurchaseOrderPicker.displayName = "PurchaseOrderPicker";
export default PurchaseOrderPicker;