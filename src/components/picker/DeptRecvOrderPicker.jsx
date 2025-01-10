import { AuthContext } from "@/contexts/auth/AuthContext";
import DeptRecvOrders from "@/modules/md-dept-recv-orders";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";


const DeptRecvOrderPicker = memo((props) => {
	const { label = "門市訂貨單", ...rest } = props;
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
			url={`v1/purchase/dep-recv-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={DeptRecvOrders.getOptionLabel}
			isOptionEqualToValue={DeptRecvOrders.isOptionEqualToValue}
			renderOptionLabel={DeptRecvOrders.renderOptionLabel}
			notFoundText="門市訂貨單號 ${id} 不存在"
			placeholder="門市訂貨單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			blurToLookup
			{...rest}
		/>
	);
})

DeptRecvOrderPicker.propTypes = {
	label: PropTypes.string
}

DeptRecvOrderPicker.displayName = "DeptRecvOrderPicker";
export default DeptRecvOrderPicker;