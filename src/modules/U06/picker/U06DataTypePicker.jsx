import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import U06DataType from "./U06DataType.mjs";

const U06DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				label={label}
				options={U06DataType.options}
				getOptionLabel={U06DataType.getOptionLabel}
				isOptionEqualToValue={U06DataType.isOptionEqualToValue}
				findByInput={U06DataType.findByInput}
				notFoundText="報表型態 ${input} 不存在"
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

U06DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U06DataTypePicker.displayName = "U06DataTypePicker";
export default U06DataTypePicker;



