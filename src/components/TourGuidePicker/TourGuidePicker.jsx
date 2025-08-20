import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo, useContext } from "react";
import TourGuides from "./TourGuides.mjs";
import { createFilterOptions } from "@mui/material";
import { useMemo } from "react";
import { useCallback } from "react";
import Arrays from "@/shared-modules/sd-arrays";

const TourGuidePicker = memo(
	forwardRef((props, ref) => {
		const { label = "導遊", forId = false, ...rest } = props;
		const { token } = useContext(AuthContext);

		const defaultFilter = useMemo(() => createFilterOptions({
			stringify: TourGuides.stringify
		}), []);

		const filterOptions = useCallback((options, state) => {
			// 執行預設過濾
			let filtered = defaultFilter(options, state);

			// 僅當有輸入值時應用自訂排序
			if (state.inputValue) {
				filtered = Arrays.sortByFoundIndex(filtered, ["AbbrID", "CndID", "CndData"], state.inputValue);
			}
			return filtered;
		}, [defaultFilter]);

		return (
			<OptionPicker
				label={label}
				ref={ref}
				bearer={token}
				url={`v1/cms/tour-guides`}
				getOptionLabel={forId ? TourGuides.getOptionLabelForId : TourGuides.getOptionLabel}
				stringify={TourGuides.stringify}
				isOptionEqualToValue={TourGuides.isOptionEqualToValue}
				renderOptionLabel={TourGuides.getOptionLabel}
				notFoundText="導遊 ${input} 不存在"
				virtualize
				filterOptions={filterOptions}
				placeholder="簡碼/編號/名稱"
				{...rest}
			/>
		);
	})
);

TourGuidePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	forId: PropTypes.bool
};

TourGuidePicker.displayName = "TourGuidePicker";
export default TourGuidePicker;
