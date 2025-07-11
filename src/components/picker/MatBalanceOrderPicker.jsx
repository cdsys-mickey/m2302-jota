import { AuthContext } from "@/contexts/auth/AuthContext";
import MatBalanceOrders from "@/modules/md-mat-balance-orders";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";


const MatBalanceOrderPicker = memo((props) => {
	const { label = "結餘MatBalanceOrderPicker單號", ...rest } = props;
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
			url={`v1/mat/balance-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={MatBalanceOrders.getOptionLabel}
			isOptionEqualToValue={MatBalanceOrders.isOptionEqualToValue}
			renderOptionLabel={MatBalanceOrders.renderOptionLabel}
			notFoundText="結餘單號 ${input} 不存在"
			placeholder="結餘單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			// blurToLookup
			{...rest}
		/>
	);
})

MatBalanceOrderPicker.propTypes = {
	label: PropTypes.string
}

MatBalanceOrderPicker.displayName = "MatBalanceOrderPicker";
export default MatBalanceOrderPicker;