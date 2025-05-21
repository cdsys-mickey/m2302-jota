import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import U07DataType from "./U07DataType.mjs";

const U07DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U07DataType.options}
				getOptionLabel={U07DataType.getOptionLabel}
				isOptionEqualToValue={U07DataType.isOptionEqualToValue}
				findByInput={U07DataType.findByInput}
				notFoundText="報表型態 ${input} 不存在"
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

U07DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U07DataTypePicker.displayName = "U07DataTypePicker";
export default U07DataTypePicker;




