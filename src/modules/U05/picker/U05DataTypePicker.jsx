import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import U05DataType from "./U05DataType.mjs";

const U05DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U05DataType.options}
				getOptionLabel={U05DataType.getOptionLabel}
				isOptionEqualToValue={U05DataType.isOptionEqualToValue}
				findByInput={U05DataType.findByInput}
				notFoundText="報表型態 ${input} 不存在"
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

U05DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U05DataTypePicker.displayName = "U05DataTypePicker";
export default U05DataTypePicker;


