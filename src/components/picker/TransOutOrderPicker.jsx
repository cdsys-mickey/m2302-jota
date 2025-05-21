import { memo } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { useMemo } from "react";
import queryString from "query-string";
import TransOutOrders from "@/modules/md-txo-orders";


const TransOutOrderPicker = memo((props) => {
	const { label = "撥出單", ...rest } = props;
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
			url={`v1/purchase/trans-out-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={TransOutOrders.getOptionLabel}
			isOptionEqualToValue={TransOutOrders.isOptionEqualToValue}
			renderOptionLabel={TransOutOrders.renderOptionLabel}
			notFoundText="撥出單號 ${input} 不存在"
			placeholder="撥出單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			// blurToLookup
			{...rest}
		/>
	);
})

TransOutOrderPicker.propTypes = {
	label: PropTypes.string
}

TransOutOrderPicker.displayName = "TransOutOrderPicker";
export default TransOutOrderPicker;