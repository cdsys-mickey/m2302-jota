import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo, useContext } from "react";
import TourGroups from "./TourGroups.mjs";
import { useMemo } from "react";
import { createFilterOptions } from "@mui/material";
import { useCallback } from "react";
import Arrays from "@/shared-modules/sd-arrays";

const TourGroupPicker = memo(
	forwardRef((props, ref) => {
		const { label = "旅行社", forId = false, ...rest } = props;
		const { token } = useContext(AuthContext);

		const defaultFilter = useMemo(() => createFilterOptions({
			stringify: TourGroups.stringify
		}), []);

		const filterOptions = useCallback((options, state) => {
			// 執行預設過濾
			let filtered = defaultFilter(options, state);

			// 僅當有輸入值時應用自訂排序
			if (state.inputValue) {
				filtered = Arrays.sortByFoundIndex(filtered, ["AbbrID", "TrvID", "TrvData"], state.inputValue);
			}
			return filtered;
		}, [defaultFilter]);

		return (
			<OptionPicker
				label={label}
				ref={ref}
				bearer={token}
				url={`v1/cms/tour-groups`}
				getOptionLabel={forId ? TourGroups.getOptionLabelForId : TourGroups.getOptionLabel}
				stringify={TourGroups.stringify}
				isOptionEqualToValue={TourGroups.isOptionEqualToValue}
				renderOptionLabel={TourGroups.getOptionLabel}
				notFoundText="旅行社 ${input} 不存在"
				virtualize
				filterOptions={filterOptions}
				placeholder="簡碼/編號/名稱"
				{...rest}
			/>
		);
	})
);

TourGroupPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	forId: PropTypes.bool
};

TourGroupPicker.displayName = "TourGroupPicker";
export default TourGroupPicker;
