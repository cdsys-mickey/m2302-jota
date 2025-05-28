import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";

export const DeptUserPicker = (props) => {
	const { label = "使用者", ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 1000,
		};
		return queryString.stringify(obj);
	}, []);

	const isOptionEqualToValue = useCallback((option, value) => {
		return option?.UID === value?.UID;
	}, []);

	const getOptions = useCallback((payload) => {
		return payload["data"];
	}, []);

	const getOptionLabel = useCallback((option) => {
		return `${option?.UserName} ${option?.LoginName}`;
	}, []);

	const getOptionKey = useCallback((option) => {
		return `${option?.UID}`;
	}, []);

	return (
		<OptionPickerWrapper
			label={label}
			bearer={token}
			url="v1/ou/users"
			// filterByServer
			queryParam="q"
			querystring={querystring}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			getOptions={getOptions}
			getOptionKey={getOptionKey}
			// blurToLookup
			{...rest}
		/>
	);
};

DeptUserPicker.displayName = "DeptUserPicker";
DeptUserPicker.propTypes = {
	label: PropTypes.string,
};
