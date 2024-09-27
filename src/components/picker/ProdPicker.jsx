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
		packageType,
		// withBomPackageName = false,
		// withSalesPackageName = false,
		// withPurchasePackageName = false,
		withStock = false,
		withPrice = false,
		forId = false,
		// ** 已報價商品專用參數
		retail,
		cst,
		...rest
	} = props;
	const { token } = useContext(AuthContext);

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
			...(packageType && {
				pkg: packageType
			}),
			// ...(withBomPackageName && {
			// 	pb: 1,
			// }),
			// ...(withSalesPackageName && {
			// 	ps: 1,
			// }),
			// ...(withPurchasePackageName && {
			// 	pi: 1,
			// }),
			...(withStock && {
				ws: 1,
			}),
			...(withPrice && {
				wp: 1,
			}),
			// 原本 fuzzy 參數的功能為是否啟用條碼搜尋, 
			// 後來演變成是否啟用 findByInput 的判斷
			// 透過 option-picker 的 API call 應該都是要帶回 fuzzy 版本
			fuzzy: 1,
			// ** 已報價商品專用參數
			...(retail && {
				retail
			}),
			...(cst && {
				cst
			})
		});
	}, [cst, packageType, retail, withPrice, withStock]);

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

	const getData = useCallback((payload) => {
		return payload["data"];
	}, []);

	const getNotFoundText = useCallback((params = {}) => {
		const { id, error } = params;
		console.log("params", params);
		return "getNotFoundText";
	}, []);

	const notFoundText = useMemo(() => {
		return retail != null ? getNotFoundText : "商品代號 ${id} 不存在"
	}, [getNotFoundText, retail])

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
			getData={getData}
			getTitle={getTitle}
			stringify={stringify}
			// notFoundText="商品代號 ${id} 不存在"
			notFoundText={notFoundText}
			placeholder="搜尋商品"
			typeToSearchText="輸入編號、條碼或名稱搜尋..."
			{...rest}
		/>
	);
};

ProdPicker.propTypes = {
	label: PropTypes.string,
	packageType: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	withBomPackageName: PropTypes.bool,
	withSalesPackageName: PropTypes.bool,
	withPurchasePackageName: PropTypes.bool,
	withStock: PropTypes.bool,
	withPrice: PropTypes.bool,
	forId: PropTypes.bool,
	fuzzy: PropTypes.bool,
	retail: PropTypes.bool,
	cst: PropTypes.string
};

ProdPicker.displayName = "ProdPicker";

export default ProdPicker;
