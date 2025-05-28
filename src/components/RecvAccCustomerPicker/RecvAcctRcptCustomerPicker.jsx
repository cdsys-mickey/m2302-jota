import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import Customers from "@/modules/md-customers";
import { useFormContext, useWatch } from "react-hook-form";

const RecvAcctRcptCustomerPicker = (props) => {
	const {
		label = "零售客戶",
		forId,
		sess,
		placeholder,
		clearValueOnChange = true,
		clearOptionsOnChange = true,
		...rest } = props;
	const { token } = useContext(AuthContext);

	const form = useFormContext();
	const session = useWatch({
		name: "session",
		control: form.control
	})

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
			ym: session?.AccYM,
			sess: session?.Stage
		});
	}, [session?.AccYM, session?.Stage]);

	const disabled = useMemo(() => {
		return !session;
	}, [session])

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
		return "v1/sales/recv-account/rcpt-customers"
	}, [])

	const notFoundText = useMemo(() => {
		return "客戶編號 ${input} 不存在";
	}, [])

	return (
		<OptionPickerWrapper
			bearer={token}
			url={url}
			label={label}
			// filterByServer
			disabled={disabled}
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

RecvAcctRcptCustomerPicker.displayName = "RecvAccCustomerPicker";
RecvAcctRcptCustomerPicker.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	ym: PropTypes.string,
	sess: PropTypes.string,
	clearOnChange: PropTypes.bool,
	clearOptionsOnChange: PropTypes.bool,
	clearValueOnChange: PropTypes.bool,
	forId: PropTypes.bool
};

export default RecvAcctRcptCustomerPicker;