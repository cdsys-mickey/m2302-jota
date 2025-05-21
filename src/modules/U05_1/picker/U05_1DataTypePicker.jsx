import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import U05_1DataType from "./U05_1DataType.mjs";

const U05_1DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U05_1DataType.options}
				getOptionLabel={U05_1DataType.getOptionLabel}
				isOptionEqualToValue={U05_1DataType.isOptionEqualToValue}
				findByInput={U05_1DataType.findByInput}
				notFoundText="報表型態 ${input} 不存在"
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

U05_1DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U05_1DataTypePicker.displayName = "U05_1DataTypePicker";
export default U05_1DataTypePicker;



