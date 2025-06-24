import { AuthContext } from "@/contexts/auth/AuthContext";
import DeptOrders from "@/modules/md-dept-orders";
import RestockOrders from "@/modules/md-restock-orders";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";


const RestockOrderPicker = memo((props) => {
	const { label = "進貨單", ...rest } = props;
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
			url={`v1/purchase/restocks`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={RestockOrders.getOptionLabel}
			isOptionEqualToValue={RestockOrders.isOptionEqualToValue}
			renderOptionLabel={RestockOrders.renderOptionLabel}
			notFoundText="進貨單號 ${input} 不存在"
			placeholder="進貨單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			// blurToLookup
			{...rest}
		/>
	);
})

RestockOrderPicker.propTypes = {
	label: PropTypes.string
}

RestockOrderPicker.displayName = "RestockOrderPicker";
export default RestockOrderPicker;