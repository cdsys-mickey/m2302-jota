import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import Customers from "../../modules/md-customers";

export const CustomerPickerContainer = (props) => {
	const { label = "客戶", ...rest } = props;
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

	const getOptionLabel = useCallback((option) => {
		return Customers.getOptionLabel(option);
	}, []);

	const getOptionKey = useCallback((option) => {
		return Customers.getOptionKey(option);
	}, []);

	return (
		<OptionPickerWrapper
			label={label}
			bearer={token}
			url="v1/sales/customers"
			// filterByServer
			// queryRequired
			queryParam="q"
			querystring={querystring}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			getData={getData}
			getOptionKey={getOptionKey}
			{...rest}
		/>
	);
};

CustomerPickerContainer.displayName = "CustomerPickerContainer";
CustomerPickerContainer.propTypes = {
	label: PropTypes.string,
};
