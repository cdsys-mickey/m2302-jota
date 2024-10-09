import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import Customers from "@/modules/md-customers";

const CustomerPicker = (props) => {
	const { label, placeholder, forId = false, forNew = false, fullName = false, ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
			fuzzy: 1,
			abbr: fullName ? 0 : 1
		});
	}, [fullName]);

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

	const url = useMemo(() => {
		return forNew ? "v1/sales/new-customers" : "v1/sales/customers"
	}, [forNew])

	const notFoundText = useMemo(() => {
		return forNew ? "新客戶編號 ${id} 不存在" : "客戶編號 ${id} 不存在";
	}, [forNew])

	const _label = useMemo(() => {
		if (label) {
			return label;
		}
		let result = (forNew ? "新客戶" : "客戶");
		if (forId) {
			result += "編號";
		}
		return result;
	}, [forId, forNew, label])


	const _placeholder = useMemo(() => {
		if (placeholder) {
			return placeholder;
		}
		// let result = (forNew ? "新客戶" : "客戶");
		let result = "編號";
		if (!forId) {
			result += "/名稱";
		}
		return result;
	}, [forId, placeholder])

	return (
		<OptionPickerWrapper
			label={_label}
			bearer={token}
			url={url}
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
			notFoundText={notFoundText}
			placeholder={_placeholder}
			typeToSearchText="輸入代號或名稱搜尋..."
			{...rest}
		/>
	);
};

CustomerPicker.displayName = "CustomerPicker";
CustomerPicker.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	forId: PropTypes.bool,
	fullName: PropTypes.bool,
	forNew: PropTypes.bool
};

export default CustomerPicker;