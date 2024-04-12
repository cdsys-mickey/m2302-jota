import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";

export const UserPicker = (props) => {
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

	const getData = useCallback((payload) => {
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
			filterByServer
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

UserPicker.displayName = "UserPicker";
UserPicker.propTypes = {
	label: PropTypes.string,
};
