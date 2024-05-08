import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import WebApiOptionPicker from "../../shared-components/picker/WebApiOptionPicker";
import Prods from "@/modules/md-prods";
import PropTypes from "prop-types";
import { useMemo } from "react";
import queryString from "query-string";
import { OptionPickerWrapper } from "../../shared-components/picker/OptionPickerWrapper";
import { useCallback } from "react";
import ProdLines from "../../modules/md-prod-lines";

export const ProdLinePickerContainer = (props) => {
	const { name, label = "生產線別", ...rest } = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		const obj = {
			tp: 1000,
		};
		return queryString.stringify(obj);
	}, []);

	const isOptionEqualToValue = useCallback((option, value) => {
		return ProdLines.isOptionEqualToValue(option, value);
	}, []);

	const getOptionLabel = useCallback((option) => {
		return ProdLines.getOptionLabel(option);
	}, []);

	return (
		<OptionPickerWrapper
			name={name}
			label={label}
			bearer={token}
			url={`v1/prod/pdlines`}
			// filterByServer
			// queryRequired
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			{...rest}
		/>
	);
};

ProdLinePickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	withBomPackageName: PropTypes.bool,
	withSalesPackageName: PropTypes.bool,
	withPurchasePackageName: PropTypes.bool,
};

ProdLinePickerContainer.displayName = "ProdLinePickerContainer";
