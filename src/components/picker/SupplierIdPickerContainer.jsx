import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";

export const SupplierIdPickerContainer = (props) => {
	const { label = "供應商", withAddr, ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
			...(withAddr && {
				ad: 1,
			}),
		});
	}, [withAddr]);

	const isOptionEqualToValue = useCallback((option, value) => {
		return option?.FactID === value?.FactID;
	}, []);

	const getOptions = useCallback((payload) => {
		return payload["data"];
	}, []);

	const getOptionLabel = useCallback((option) => {
		return `${option?.FactID}`;
	}, []);

	const renderOptionLabel = useCallback((option) => {
		return `${option?.FactID} ${option?.FactData}`;
	}, []);

	const getOptionKey = useCallback((option) => {
		return `${option?.FactID}`;
	}, []);

	return (
		<OptionPicker
			label={label}
			bearer={token}
			url="v1/purchase/suppliers"
			// filterByServer
			// queryRequired

			virtualize
			queryParam="q"
			querystring={querystring}
			getOptionLabel={getOptionLabel}
			renderOptionLabel={renderOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			getOptions={getOptions}
			getOptionKey={getOptionKey}
			// blurToLookup
			{...rest}
		/>
	);
};

SupplierIdPickerContainer.displayName = "SupplierIdPickerContainer";
SupplierIdPickerContainer.propTypes = {
	label: PropTypes.string,
};
