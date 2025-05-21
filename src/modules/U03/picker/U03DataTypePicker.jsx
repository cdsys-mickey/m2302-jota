import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import U03DataType from "./U03DataType.mjs";
import Constants from "@/modules/md-constants";

const U03DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U03DataType.options}
				getOptionLabel={U03DataType.getOptionLabel}
				isOptionEqualToValue={U03DataType.isOptionEqualToValue}
				findByInput={U03DataType.findByInput}
				notFoundText="報表型態 ${input} 不存在"
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

U03DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U03DataTypePicker.displayName = "U03DataTypePicker";
export default U03DataTypePicker;



