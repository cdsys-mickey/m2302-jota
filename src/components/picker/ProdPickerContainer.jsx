import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/AuthContext";
import WebApiOptionPicker from "../../shared-components/picker/WebApiOptionPicker";
import Prods from "@/modules/md-prods";
import PropTypes from "prop-types";
import { useMemo } from "react";
import QueryString from "query-string";

export const ProdPickerContainer = (props) => {
	const { label = "大分類", withBomPackageName = false, ...rest } = props;
	const { token } = useContext(AuthContext);

	const queryString = useMemo(() => {
		const obj = {
			tp: 20,
			...(withBomPackageName && {
				pb: 1,
			}),
		};
		return QueryString.stringify(obj);
	}, [withBomPackageName]);

	return (
		<WebApiOptionPicker
			label={label}
			bearer={token}
			url={`v1/prods`}
			filterByServer
			queryString={queryString}
			getOptionLabel={Prods.getOptionLabel}
			isOptionEqualToValue={Prods.isOptionEqualToValue}
			{...rest}
		/>
	);
};
ProdPickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	withBomPackageName: PropTypes.bool,
};

ProdPickerContainer.displayName = "ProdPickerContainer";
