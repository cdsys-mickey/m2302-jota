import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import U08DataType from "./U08DataType.mjs";

const U08DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				label={label}
				options={U08DataType.options}
				getOptionLabel={U08DataType.getOptionLabel}
				isOptionEqualToValue={U08DataType.isOptionEqualToValue}
				findByInput={U08DataType.findByInput}
				notFoundText="報表型態 ${input} 不存在"
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

U08DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U08DataTypePicker.displayName = "U08DataTypePicker";
export default U08DataTypePicker;




