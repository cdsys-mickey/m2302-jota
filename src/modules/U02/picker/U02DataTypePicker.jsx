import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import U02DataType from "./U02DataType.mjs";
import Constants from "@/modules/md-constants";

const U02DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				label={label}
				options={U02DataType.options}
				getOptionLabel={U02DataType.getOptionLabel}
				isOptionEqualToValue={U02DataType.isOptionEqualToValue}
				findByInput={U02DataType.findByInput}
				notFoundText="報表型態 ${input} 不存在"
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

U02DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

U02DataTypePicker.displayName = "U02DataTypePicker";
export default U02DataTypePicker;



