import { AuthContext } from "@/contexts/auth/AuthContext";
import DeptOrders from "@/modules/md-dept-orders";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";


const DeptOrderPicker = memo((props) => {
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
			url={`v1/purchase/dep-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={DeptOrders.getOptionLabel}
			isOptionEqualToValue={DeptOrders.isOptionEqualToValue}
			renderOptionLabel={DeptOrders.renderOptionLabel}
			notFoundText="門市訂貨單號 ${id} 不存在"
			placeholder="門市訂貨單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			// blurToLookup
			{...rest}
		/>
	);
})

DeptOrderPicker.propTypes = {
	label: PropTypes.string
}

DeptOrderPicker.displayName = "DeptOrderPicker";
export default DeptOrderPicker;