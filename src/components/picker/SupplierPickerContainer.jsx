import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";

export const SupplierPickerContainer = (props) => {
	const { label = "供應商", ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
		});
	}, []);

	const isOptionEqualToValue = useCallback((option, value) => {
		return option?.FactID === value?.FactID;
	}, []);

	const getData = useCallback((payload) => {
		return payload["data"];
	}, []);

	const getOptionLabel = useCallback((option) => {
		return `${option?.FactID} ${option?.FactData}`;
	}, []);

	const getOptionKey = useCallback((option) => {
		return `${option?.FactID}`;
	}, []);

	return (
		<OptionPickerWrapper
			label={label}
			bearer={token}
			url="v1/purchase/suppliers"
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

SupplierPickerContainer.displayName = "SupplierPickerContainer";
SupplierPickerContainer.propTypes = {
	label: PropTypes.string,
};
