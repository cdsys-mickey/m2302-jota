import { AuthContext } from "@/contexts/auth/AuthContext";
import OwnBrandStockingOrders from "@/modules/md-own-brand-stocking-orders";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";
const OwnBrandStockingOrderPicker = memo((props) => {
	const { label = "入庫單號", ...rest } = props;
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
		<OptionPickerWrapper
			label={label}
			url={`v1/own-brand/stocking-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={OwnBrandStockingOrders.getOptionLabel}
			isOptionEqualToValue={OwnBrandStockingOrders.isOptionEqualToValue}
			renderOptionLabel={OwnBrandStockingOrders.renderOptionLabel}
			notFoundText="入庫單號 ${input} 不存在"
			placeholder="入庫單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			// blurToLookup
			{...rest}
		/>
	);
})

OwnBrandStockingOrderPicker.propTypes = {
	label: PropTypes.string
}

OwnBrandStockingOrderPicker.displayName = "OwnBrandStockingOrderPicker";
export default OwnBrandStockingOrderPicker;