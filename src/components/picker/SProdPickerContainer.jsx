import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import WebApiOptionPicker from "../../shared-components/option-picker/WebApiOptionPicker";
import Prods from "@/modules/md-prods";
import PropTypes from "prop-types";
import { useMemo } from "react";
import queryString from "query-string";
import { OptionPickerWrapper } from "../../shared-components/option-picker/OptionPickerWrapper";
import { useCallback } from "react";
import SProds from "../../modules/md-sprods";

export const SProdPickerContainer = (props) => {
	const {
		name,
		label = "商品",
		withBomPackageName = false,
		withSalesPackageName = false,
		withPurchasePackageName = false,
		withStock = false,
		...rest
	} = props;
	const { token } = useContext(AuthContext);
	// console.log("rendering SProdPickerContainer");

	const querystring = useMemo(() => {
		const obj = {
			tp: 10000,
			...(withBomPackageName && {
				pb: 1,
			}),
			...(withSalesPackageName && {
				ps: 1,
			}),
			...(withPurchasePackageName && {
				pi: 1,
			}),
			...(withStock && {
				ws: 1,
			}),
		};
		return queryString.stringify(obj);
	}, [
		withBomPackageName,
		withPurchasePackageName,
		withSalesPackageName,
		withStock,
	]);

	const isOptionEqualToValue = useCallback((option, value) => {
		return SProds.isOptionEqualToValue(option, value);
	}, []);

	const getOptionLabel = useCallback((option) => {
		return SProds.getOptionLabel(option);
	}, []);

	return (
		<OptionPickerWrapper
			name={name}
			label={label}
			bearer={token}
			url={`v1/prods`}
			// filterByServer
			// queryRequired
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			// blurToLookup
			{...rest}
		/>
	);
};

SProdPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	withBomPackageName: PropTypes.bool,
	withSalesPackageName: PropTypes.bool,
	withPurchasePackageName: PropTypes.bool,
	withStock: PropTypes.bool,
};

SProdPickerContainer.displayName = "SProdPickerContainer";
