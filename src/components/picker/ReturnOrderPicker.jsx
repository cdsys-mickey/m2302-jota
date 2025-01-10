import { memo } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { useMemo } from "react";
import queryString from "query-string";
import ReturnOrders from "@/modules/md-return-orders";


const ReturnOrderPicker = memo((props) => {
	const { label = "退貨單", ...rest } = props;
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
			url={`v1/purchase/returns`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={ReturnOrders.getOptionLabel}
			isOptionEqualToValue={ReturnOrders.isOptionEqualToValue}
			renderOptionLabel={ReturnOrders.renderOptionLabel}
			notFoundText="退貨單號 ${id} 不存在"
			placeholder="退貨單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			blurToLookup
			{...rest}
		/>
	);
})

ReturnOrderPicker.propTypes = {
	label: PropTypes.string
}

ReturnOrderPicker.displayName = "ReturnOrderPicker";
export default ReturnOrderPicker;