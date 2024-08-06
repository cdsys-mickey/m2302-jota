import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Prods from "@/modules/md-prods";
import PropTypes from "prop-types";
import { useMemo } from "react";
import queryString from "query-string";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { useCallback } from "react";

const ProdPicker = (props) => {
	const {
		label = "商品",
		withBomPackageName = false,
		withSalesPackageName = false,
		withPurchasePackageName = false,
		withStock = false,
		forId = false,
		fuzzy = false,
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
			...(withStock && {
				ws: 1,
			}),
			...(fuzzy && {
				fuzzy: 1,
			}),
		};
		return queryString.stringify(obj);
	}, [
		fuzzy,
		withBomPackageName,
		withPurchasePackageName,
		withSalesPackageName,
		withStock,
	]);

	const isOptionEqualToValue = useCallback((option, value) => {
		return Prods.isOptionEqualToValue(option, value);
	}, []);

	const getOptionLabel = useCallback(
		(option) => {
			return forId
				? Prods.getOptionLabelForId(option)
				: Prods.getOptionLabel(option);
		},
		[forId]
	);

	const getTitle = useCallback((option) => {
		return Prods.getTitle(option);
	}, []);

	const stringify = useCallback((option) => {
		return Prods.stringify(option);
	}, []);

	const renderOptionLabel = useCallback((option) => {
		return Prods.renderOptionLabel(option);
	}, []);

	return (
		<OptionPickerWrapper
			label={label}
			url={`v1/prods`}
			bearer={token}
			queryParam="qs"
			querystring={querystring}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			renderOptionLabel={renderOptionLabel}
			getTitle={getTitle}
			stringify={stringify}
			notFoundText="商品代號 ${id} 不存在"
			{...rest}
		/>
	);
};

ProdPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	withBomPackageName: PropTypes.bool,
	withSalesPackageName: PropTypes.bool,
	withPurchasePackageName: PropTypes.bool,
	withStock: PropTypes.bool,
	forId: PropTypes.bool,
	fuzzy: PropTypes.bool,
};

ProdPicker.displayName = "ProdPicker";

export default ProdPicker;
