import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import Employees from "../../modules/md-employees";

const EmployeePicker = (props) => {
	const { label = "員工", withQuotes = false, ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 1000,
			...(withQuotes && {
				wq: 1
			})
		};
		return queryString.stringify(obj);
	}, [withQuotes]);

	const getData = useCallback((payload) => {
		return payload["data"];
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
			getOptionLabel={Employees.getOptionLabel}
			isOptionEqualToValue={Employees.isOptionEqualToValue}
			getData={getData}
			getOptionKey={getOptionKey}
			placeholder="員工編號"
			notFoundText="員工 ${id} 不存在"
			blurToLookup
			{...rest}
		/>
	);
};

EmployeePicker.displayName = "EmployeePicker";
EmployeePicker.propTypes = {
	label: PropTypes.string,
	withQuotes: PropTypes.bool
};

export default EmployeePicker;