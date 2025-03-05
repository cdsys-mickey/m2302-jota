import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import U04DataType from "./U04DataType.mjs";

const U04DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={U04DataType.dataTypeOptions}
				getOptionLabel={U04DataType.getOptionLabel}
				isOptionEqualToValue={U04DataType.isOptionEqualToValue}
				findByInput={U04DataType.findByInput}
				notFoundText="報表型態 ${id} 不存在"
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

U04DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U04DataTypePicker.displayName = "U04DataTypePicker";
export default U04DataTypePicker;



