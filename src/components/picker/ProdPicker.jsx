import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Prods from "@/modules/md-prods";
import PropTypes from "prop-types";
import { useMemo } from "react";
import queryString from "query-string";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { useCallback } from "react";
import _ from "lodash";
import { createFilterOptions } from "@mui/material";

const ProdPicker = (props) => {
	const {
		label = "商品",
		packageType,
		// withBomPackageName = false,
		// withSalesPackageName = false,
		// withPurchasePackageName = false,
		withStock = false,
		withPrice = false,
		withQuotes = false,
		forId = false,
		// ** 已報價商品專用參數
		retail,
		cst,
		slotProps = {},
		...rest
	} = props;
	const { token } = useContext(AuthContext);

	const { paper: paperProps, ..._slotProps } = slotProps;

	const querystring = useMemo(() => {
		return queryString.stringify({
			tp: 10000,
			...(packageType && {
				pkg: packageType
			}),
			...(withStock && {
				ws: 1,
			}),
			...(withPrice && {
				wp: 1,
			}),
			...(withQuotes && {
				wq: 1
			}),
			// 原本 fuzzy 參數的功能為是否啟用條碼搜尋, 
			// 後來演變成是否啟用 findByInput 的判斷
			// 透過 option-picker 的 API call 應該都是要帶回 fuzzy 版本
			fuzzy: 1,
			opts: 1,
			// ** 已報價商品專用參數
			...(retail != null && {
				retail: retail ? 1 : 0
			}),
			cst,
			// compTel,
		});
	}, [cst, packageType, retail, withPrice, withQuotes, withStock]);

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

	const getOptions = useCallback((payload) => {
		return payload["data"];
	}, []);

	const getNotFoundText = useCallback((params = {}) => {
		const { error } = params;
		const notFoundMsgTemplate = _.template("商品代號 ${input} 不存在");
		const notFoundMsg = notFoundMsgTemplate(params);
		return error?.message || notFoundMsg;
	}, []);

	const notFoundText = useMemo(() => {
		return retail != null ? getNotFoundText : "商品代號 ${input} 不存在"
	}, [getNotFoundText, retail])

	const defaultFilter = useMemo(() => createFilterOptions({
		stringify: (option) => `${option.ProdID} ${option.ProdData} ${option.Barcode}`
	}), []);

	const filterOptions = useCallback((options, state) => {
		// 執行預設過濾
		let filtered = defaultFilter(options, state);

		// 僅當有輸入值時應用自訂排序
		if (state.inputValue) {
			filtered = filtered.sort((a, b) => {
				const input = state.inputValue.toLowerCase();

				// 比較 ProdID 的匹配位置
				const aProdIDIndex = a.ProdID.toLowerCase().indexOf(input);
				const bProdIDIndex = b.ProdID.toLowerCase().indexOf(input);
				if (aProdIDIndex !== bProdIDIndex) {
					if (aProdIDIndex === -1) return 1; // a 無匹配，排後面
					if (bProdIDIndex === -1) return -1; // b 無匹配，排後面
					return aProdIDIndex - bProdIDIndex; // 比較位置
				}

				// 比較 ProdData 的匹配位置
				const aProdDataIndex = a.ProdData.toLowerCase().indexOf(input);
				const bProdDataIndex = b.ProdData.toLowerCase().indexOf(input);
				if (aProdDataIndex !== bProdDataIndex) {
					if (aProdDataIndex === -1) return 1; // a 無匹配，排後面
					if (bProdDataIndex === -1) return -1; // b 無匹配，排後面
					return aProdDataIndex - bProdDataIndex; // 比較位置
				}

				// 比較 Barcode 的匹配位置
				const aBarcodeIndex = a.Barcode.toLowerCase().indexOf(input);
				const bBarcodeIndex = b.Barcode.toLowerCase().indexOf(input);
				if (aBarcodeIndex === -1 && bBarcodeIndex === -1) return 0; // 都無匹配，保持順序
				if (aBarcodeIndex === -1) return 1; // a 無匹配，排後面
				if (bBarcodeIndex === -1) return -1; // b 無匹配，排後面
				return aBarcodeIndex - bBarcodeIndex; // 比較位置
			});
		}

		return filtered;
	}, [defaultFilter]);

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
			getOptions={getOptions}
			getTitle={getTitle}
			stringify={stringify}
			// notFoundText="商品代號 ${input} 不存在"
			notFoundText={notFoundText}
			placeholder="以編號或品名搜尋"
			typeToSearchText="輸入編號、條碼或名稱搜尋..."
			filterOptions={filterOptions}
			slotProps={{
				..._slotProps,
				paper: {
					sx: {
						width: 300,
					},
					...paperProps
				},
			}}
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
	withQuotes: PropTypes.bool,
	forId: PropTypes.bool,
	fuzzy: PropTypes.bool,
	retail: PropTypes.bool,
	cst: PropTypes.string,
	slotProps: PropTypes.object
	// compTel: PropTypes.string
};

ProdPicker.displayName = "ProdPicker";

export default ProdPicker;
