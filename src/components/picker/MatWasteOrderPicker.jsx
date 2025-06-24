import { AuthContext } from "@/contexts/auth/AuthContext";
import MatWasteOrders from "@/modules/md-mat-waste-orders";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";


const MatWasteOrderPicker = memo((props) => {
	const { label = "報廢單號", ...rest } = props;
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
			url={`v1/mat/waste-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={MatWasteOrders.getOptionLabel}
			isOptionEqualToValue={MatWasteOrders.isOptionEqualToValue}
			renderOptionLabel={MatWasteOrders.renderOptionLabel}
			notFoundText="報廢單號 ${input} 不存在"
			placeholder="報廢單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			// blurToLookup
			{...rest}
		/>
	);
})

MatWasteOrderPicker.propTypes = {
	label: PropTypes.string
}

MatWasteOrderPicker.displayName = "MatWasteOrderPicker";
export default MatWasteOrderPicker;