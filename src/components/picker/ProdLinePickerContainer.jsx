import PropTypes from "prop-types";
import queryString from "query-string";
import { useCallback, useContext, useMemo } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import ProdLines from "../../modules/md-prod-lines";
import { OptionPickerWrapper } from "../../shared-components/option-picker/OptionPickerWrapper";

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
