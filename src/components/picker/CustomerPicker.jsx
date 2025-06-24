import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import Customers from "@/modules/md-customers";

const CustomerPicker = (props) => {
	const { label, placeholder, forId = false, forNew = false, fullName = false, withQuotes = false,
		// clearOnChange = true, 
		clearValueOnChange = true,
		clearOptionsOnChange = true,
		...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
			fuzzy: 1,
			abbr: fullName ? 0 : 1,
			...(withQuotes && {
				wq: 1
			})
		});
	}, [fullName, withQuotes]);

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

	const url = useMemo(() => {
		return forNew ? "v1/sales/new-customers" : "v1/sales/customers"
	}, [forNew])

	const notFoundText = useMemo(() => {
		return forNew ? "零售客戶編號 ${input} 不存在" : "客戶編號 ${input} 不存在";
	}, [forNew])

	const _label = useMemo(() => {
		let autoLabel = (forNew ? "零售客戶" : "客戶");
		if (forId) {
			autoLabel += "編號";
		}
		// 當 label 為 null 或 undefined 時才帶出
		return label == null ? autoLabel : label;
	}, [forId, forNew, label])


	const _placeholder = useMemo(() => {
		if (placeholder) {
			return placeholder;
		}
		let result = (forNew ? "零售客戶" : "客戶");
		result += "編號";
		if (!forId) {
			result += "/名稱";
		}
		return result;
	}, [forId, forNew, placeholder])

	return (
		<OptionPicker
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
			getOptions={getOptions}
			getTitle={getTitle}
			stringify={stringify}
			getOptionKey={getOptionKey}
			notFoundText={notFoundText}
			placeholder={_placeholder}
			typeToSearchText="輸入代號或名稱搜尋..."
			// clearOnChange
			// clearOnChange={clearOnChange}
			clearValueOnChange={clearValueOnChange}
			clearOptionsOnChange={clearOptionsOnChange}
			// blurToLookup
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
	forNew: PropTypes.bool,
	autoLabel: PropTypes.bool,
	withQuotes: PropTypes.bool,
	clearOnChange: PropTypes.bool,
	clearOptionsOnChange: PropTypes.bool,
	clearValueOnChange: PropTypes.bool
};

export default CustomerPicker;