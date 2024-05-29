import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";

export const EmployeePicker = (props) => {
	const { label = "員工", ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 1000,
		};
		return queryString.stringify(obj);
	}, []);

	const isOptionEqualToValue = useCallback((option, value) => {
		return option?.CodeID === value?.CodeID;
	}, []);

	const getData = useCallback((payload) => {
		return payload["data"];
	}, []);

	const getOptionLabel = useCallback((option) => {
		return `${option?.CodeID} ${option?.CodeData}`;
	}, []);

	const getOptionKey = useCallback((option) => {
		return `${option?.CodeID}`;
	}, []);

	return (
		<OptionPickerWrapper
			label={label}
			bearer={token}
			url="v1/ou/employees"
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

EmployeePicker.displayName = "EmployeePicker";
EmployeePicker.propTypes = {
	label: PropTypes.string,
};
