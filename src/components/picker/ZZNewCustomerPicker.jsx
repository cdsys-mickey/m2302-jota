import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import Customers from "../../modules/Customers";

const NewCustomerPicker = (props) => {
	const { label = "客戶", forId = false, ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
			fuzzy: 1,
		});
	}, []);

	const isOptionEqualToValue = useCallback((option, value) => {
		return Customers.isOptionEqualToValue(option, value);
	}, []);

	const getOptions = useCallback((payload) => {
		return payload["data"];
	}, []);

	const getTitle = useCallback((option) => {
		return Customers.getTitle(option);
	}, []);

	const stringify = useCallback((option) => {
		return Customers.stringify(option);
	}, []);


	const getOptionLabel = useCallback((option) => {
		return forId
			? Customers.getOptionLabelForId(option)
			: Customers.getOptionLabel(option);
	}, [forId]);

	const getOptionKey = useCallback((option) => {
		return Customers.getOptionKey(option);
	}, []);

	const renderOptionLabel = useCallback((option) => {
		return Customers.renderOptionLabel(option);
	}, []);

	return (
		<OptionPicker
			label={label}
			bearer={token}
			url="v1/sales/new-customers"
			// filterByServer
			// queryRequired
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			renderOptionLabel={renderOptionLabel}
			getOptions={getOptions}
			getTitle={getTitle}
			stringify={stringify}
			getOptionKey={getOptionKey}
			notFoundText="新客戶代號 ${input} 不存在"
			placeholder="新客戶編號/名稱"
			typeToSearchText="輸入代號或名稱搜尋..."
			{...rest}
		/>
	);
};

NewCustomerPicker.displayName = "CustomerPicker";
NewCustomerPicker.propTypes = {
	label: PropTypes.string,
};

export default NewCustomerPicker;