import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import CmsCalTypes from "./CmsCalTypes.mjs";



const CmsCalcTypePicker = forwardRef((props, ref) => {
	const { name, label = "佣金計算", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={CmsCalTypes.options}
			getOptionLabel={CmsCalTypes.getOptionLabel}
			isOptionEqualToValue={CmsCalTypes.isOptionEqualToValue}
			findByInput={CmsCalTypes.findByInput}
			notFoundText="佣金計算方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});

CmsCalcTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsCalcTypePicker.displayName = "CmsCalcTypePicker";
export default CmsCalcTypePicker;
