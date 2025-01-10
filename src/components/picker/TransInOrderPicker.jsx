import { memo } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { useMemo } from "react";
import queryString from "query-string";
import TransInOrders from "@/modules/md-txi-orders";



const TransInOrderPicker = memo((props) => {
	const { label = "撥入單", ...rest } = props;
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
			url={`v1/purchase/trans-in-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={TransInOrders.getOptionLabel}
			isOptionEqualToValue={TransInOrders.isOptionEqualToValue}
			renderOptionLabel={TransInOrders.renderOptionLabel}
			notFoundText="撥入單號 ${id} 不存在"
			placeholder="撥入單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			blurToLookup
			{...rest}
		/>
	);
})

TransInOrderPicker.propTypes = {
	label: PropTypes.string
}

TransInOrderPicker.displayName = "TransInOrderPicker";
export default TransInOrderPicker;