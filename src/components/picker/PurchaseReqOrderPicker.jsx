import { memo } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { useMemo } from "react";
import queryString from "query-string";
import PurchaseReqOrders from "@/modules/md-purchase-req-orders";

const PurchaseReqOrderPicker = memo((props) => {
	const { label = "請購單", ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 10000,
		};
		return queryString.stringify(obj);
	}, []);


	return (
		<OptionPickerWrapper
			label={label}
			url={`v1/purchase/req-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={PurchaseReqOrders.getOptionLabel}
			isOptionEqualToValue={PurchaseReqOrders.isOptionEqualToValue}
			renderOptionLabel={PurchaseReqOrders.renderOptionLabel}
			// getTitle={PurchaseReqOrders.renderOptionLabel}
			// stringify={stringify}
			notFoundText="請購單號 ${id} 不存在"
			placeholder="請購單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			{...rest}
		/>
	);
})

PurchaseReqOrderPicker.propTypes = {
	label: PropTypes.string
}

PurchaseReqOrderPicker.displayName = "PurchaseReqOrderPicker";
export default PurchaseReqOrderPicker;