import { AuthContext } from "@/contexts/auth/AuthContext";
import MatReturnOrders from "@/modules/md-mat-return-orders";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { memo, useContext, useMemo } from "react";


const MatReturnOrderPicker = memo((props) => {
	const { label = "退料單號", ...rest } = props;
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
			url={`v1/mat/returning-orders`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={MatReturnOrders.getOptionLabel}
			isOptionEqualToValue={MatReturnOrders.isOptionEqualToValue}
			renderOptionLabel={MatReturnOrders.renderOptionLabel}
			notFoundText="退料單號 ${id} 不存在"
			placeholder="退料單號"
			typeToSearchText="輸入單號或片段進行搜尋..."
			inputParam="fz"
			// blurToLookup
			{...rest}
		/>
	);
})

MatReturnOrderPicker.propTypes = {
	label: PropTypes.string
}

MatReturnOrderPicker.displayName = "MatReturnOrderPicker";
export default MatReturnOrderPicker;