import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import CmsBusComps from "./CmsBusComps";
import { useCallback } from "react";
import { useMemo } from "react";
import { createFilterOptions } from "@mui/material";
import Arrays from "@/shared-modules/sd-arrays";

const CmsBusCompPicker = forwardRef((props, ref) => {
	const { label = "車行", forId = false, ...rest } = props;
	const { token } = useContext(AuthContext);

	const defaultFilter = useMemo(() => createFilterOptions({
		stringify: CmsBusComps.stringify
	}), []);

	const filterOptions = useCallback((options, state) => {
		// 執行預設過濾
		let filtered = defaultFilter(options, state);

		// 僅當有輸入值時應用自訂排序
		if (state.inputValue) {
			filtered = Arrays.sortByFoundIndex(filtered, ["AbbrID", "CarID", "CarData"], state.inputValue);
		}
		return filtered;
	}, [defaultFilter]);

	return (
		<OptionPicker
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/cms/bus-comps`}
			getOptionLabel={forId ? CmsBusComps.getOptionLabelForId : CmsBusComps.getOptionLabel}
			stringify={CmsBusComps.stringify}
			isOptionEqualToValue={CmsBusComps.isOptionEqualToValue}
			notFoundText="車行 ${input} 不存在"
			renderOptionLabel={CmsBusComps.getOptionLabel}
			virtualize
			filterOptions={filterOptions}
			placeholder="簡碼/編號/名稱"
			// blurToLookup
			{...rest}
		/>
	);
});
CmsBusCompPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	forId: PropTypes.bool
};

CmsBusCompPicker.displayName = "CmsBusCompPicker";
export default CmsBusCompPicker;
