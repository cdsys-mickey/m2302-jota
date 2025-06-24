import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import U01DataType from "./U01DataType.mjs";
import Constants from "@/modules/md-constants";

const U01DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				label={label}
				options={U01DataType.options}
				getOptionLabel={U01DataType.getOptionLabel}
				isOptionEqualToValue={U01DataType.isOptionEqualToValue}
				findByInput={U01DataType.findByInput}
				notFoundText="報表型態 ${input} 不存在"
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

U01DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U01DataTypePicker.displayName = "U01DataTypePicker";
export default U01DataTypePicker;


