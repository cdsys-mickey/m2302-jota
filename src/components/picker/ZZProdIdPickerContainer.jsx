import Prods from "@/modules/md-prods";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import queryString from "query-string";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";

export const ZZProdIdPickerContainer = (props) => {
	const {
		name,
		label = "商品編號",
		withBomPackageName = false,
		withSalesPackageName = false,
		withPurchasePackageName = false,
		...rest
	} = props;
	const { token } = useContext(AuthContext);

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
		};
		return queryString.stringify(obj);
	}, [withBomPackageName, withPurchasePackageName, withSalesPackageName]);

	return (
		<OptionPicker
			name={name}
			label={label}
			bearer={token}
			url={`v1/prods`}
			// filterByServer
			// queryRequired
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={Prods.getOptionLabel}
			isOptionEqualToValue={Prods.isOptionEqualToValue}
			{...rest}
		/>
	);
};
ZZProdIdPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	withBomPackageName: PropTypes.bool,
	withSalesPackageName: PropTypes.bool,
	withPurchasePackageName: PropTypes.bool,
};

ZZProdIdPickerContainer.displayName = "ProdIdPickerContainer";
