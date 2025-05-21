import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";
import CustomerOrders from "./CustomerOrders.mjs";

/**
 * 訂貨單挑選器
 */
const E01SalesOrderPicker = memo((props) => {
	const { label = "訂貨單號", ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 10000,
			opts: 1
		};
		return queryString.stringify(obj);
	}, []);


	return (
		<OptionPickerWrapper
			label={label}
			url={`v1/sales/customer-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={CustomerOrders.getOptionLabel}
			isOptionEqualToValue={CustomerOrders.isOptionEqualToValue}
			renderOptionLabel={CustomerOrders.renderOptionLabel}
			notFoundText="訂貨單號 ${input} 不存在"
			placeholder="訂貨單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			// blurToLookup
			{...rest}
		/>
	);
})

E01SalesOrderPicker.propTypes = {
	label: PropTypes.string
}

E01SalesOrderPicker.displayName = "CustomerOrderPicker";
export default E01SalesOrderPicker;