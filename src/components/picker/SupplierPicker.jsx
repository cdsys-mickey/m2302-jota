import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import Suppliers from "../../modules/md-suppliers";

const SupplierPicker = (props) => {
	const { label = "供應商", forId, withAddr, ...rest } = props;
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
		return Suppliers.isOptionEqualToValue(option, value);
	}, []);

	const getData = useCallback((payload) => {
		return payload["data"];
	}, []);

	const getOptionLabel = useCallback((option) => {
		return forId ? Suppliers.getOptionLabelForId(option) : Suppliers.getOptionLabel(option);
	}, [forId]);

	const getOptionKey = useCallback((option) => {
		return Suppliers.getOptionKey(option);
	}, []);

	const getTitle = useCallback((option) => {
		return Suppliers.getTitle(option);
	}, []);

	const stringify = useCallback((option) => {
		return Suppliers.stringify(option);
	}, []);

	const renderOptionLabel = useCallback((option) => {
		return Suppliers.renderOptionLabel(option);
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
			renderOptionLabel={renderOptionLabel}
			getData={getData}
			getTitle={getTitle}
			stringify={stringify}
			getOptionKey={getOptionKey}
			notFoundText="廠商 ${id} 不存在"
			{...rest}
		/>
	);
};

SupplierPicker.displayName = "SupplierPicker";
SupplierPicker.propTypes = {
	label: PropTypes.string,
	forId: PropTypes.bool,
	withAddr: PropTypes.bool
};

export default SupplierPicker;