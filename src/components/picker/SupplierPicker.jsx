import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import Suppliers from "../../modules/md-suppliers";

const SupplierPicker = (props) => {
	const { label = "供應商", ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
		});
	}, []);

	const isOptionEqualToValue = useCallback((option, value) => {
		return Suppliers.isOptionEqualToValue(option, value);
	}, []);

	const getData = useCallback((payload) => {
		return payload["data"];
	}, []);

	const getOptionLabel = useCallback((option) => {
		return Suppliers.getOptionLabel(option);
	}, []);

	const getOptionKey = useCallback((option) => {
		return Suppliers.getOptionKey(option);
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
			notFoundText="廠商 ${id} 不存在"
			{...rest}
		/>
	);
};

SupplierPicker.displayName = "SupplierPicker";
SupplierPicker.propTypes = {
	label: PropTypes.string,
};

export default SupplierPicker;