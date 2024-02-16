import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import WebApiOptionPicker from "../../shared-components/picker/WebApiOptionPicker";
import Prods from "@/modules/md-prods";
import PropTypes from "prop-types";
import { useMemo } from "react";
import QueryString from "query-string";
import { ControlledWebApiOptionPicker } from "../../shared-components/controlled/ControlledWebApiOptionPicker";

export const ProdPickerContainer = (props) => {
	const {
		name,
		label = "商品",
		withBomPackageName = false,
		withSalesPackageName = false,
		...rest
	} = props;
	const { token } = useContext(AuthContext);

	const queryString = useMemo(() => {
		const obj = {
			tp: 20,
			...(withBomPackageName && {
				pb: 1,
			}),
			...(withSalesPackageName && {
				ps: 1,
			}),
		};
		return QueryString.stringify(obj);
	}, [withBomPackageName, withSalesPackageName]);

	if (!name) {
		<WebApiOptionPicker
			label={label}
			bearer={token}
			url={`v1/prods`}
			filterByServer
			queryRequired
			queryString={queryString}
			getOptionLabel={Prods.getOptionLabel}
			isOptionEqualToValue={Prods.isOptionEqualToValue}
			{...rest}
		/>;
	}
	return (
		<ControlledWebApiOptionPicker
			name={name}
			label={label}
			bearer={token}
			url={`v1/prods`}
			filterByServer
			queryRequired
			queryParam="qs"
			queryString={queryString}
			getOptionLabel={Prods.getOptionLabel}
			isOptionEqualToValue={Prods.isOptionEqualToValue}
			{...rest}
		/>
	);
};
ProdPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	withBomPackageName: PropTypes.bool,
};

ProdPickerContainer.displayName = "ProdPickerContainer";
