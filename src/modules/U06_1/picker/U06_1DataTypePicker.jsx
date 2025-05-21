import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import U06_1DataType from "./U06_1DataType.mjs";

const U06_1DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U06_1DataType.options}
				getOptionLabel={U06_1DataType.getOptionLabel}
				isOptionEqualToValue={U06_1DataType.isOptionEqualToValue}
				findByInput={U06_1DataType.findByInput}
				notFoundText="報表型態 ${input} 不存在"
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

U06_1DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U06_1DataTypePicker.displayName = "U06_1DataTypePicker";
export default U06_1DataTypePicker;




