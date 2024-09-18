import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import Customers from "../../modules/md-customers";

const NewCustomerPicker = (props) => {
	const { label = "客戶", forId = false, ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
		});
	}, []);

	const isOptionEqualToValue = useCallback((option, value) => {
		return Customers.isOptionEqualToValue(option, value);
	}, []);

	const getData = useCallback((payload) => {
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
		<OptionPickerWrapper
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
			getData={getData}
			getTitle={getTitle}
			stringify={stringify}
			getOptionKey={getOptionKey}
			notFoundText="新客戶代號 ${id} 不存在"
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