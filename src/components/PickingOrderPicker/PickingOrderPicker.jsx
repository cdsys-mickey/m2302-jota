import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";
import PickingOrders from "./PickingOrders.mjs";

/**
 * 領料單挑選器
 */
const PickingOrderPicker = memo((props) => {
	const { label = "領料單號", ...rest } = props;
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
			url={`v1/mat/picking-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={PickingOrders.getOptionLabel}
			isOptionEqualToValue={PickingOrders.isOptionEqualToValue}
			renderOptionLabel={PickingOrders.renderOptionLabel}
			notFoundText="領料單號 ${input} 不存在"
			placeholder="領料單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			// blurToLookup
			{...rest}
		/>
	);
})

PickingOrderPicker.propTypes = {
	label: PropTypes.string
}

PickingOrderPicker.displayName = "PickingOrderPicker";
export default PickingOrderPicker;