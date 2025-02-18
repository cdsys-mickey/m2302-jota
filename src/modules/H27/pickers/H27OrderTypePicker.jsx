import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import H27OrderType from "./H27OrderType.mjs";


const H27OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={H27OrderType.options}
			getOptionLabel={H27OrderType.getOptionLabel}
			isOptionEqualToValue={H27OrderType.isOptionEqualToValue}
			findByInput={H27OrderType.findByInput}
			notFoundText="排序方式 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
H27OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

H27OrderTypePicker.displayName = "H27OrderTypePicker";
export default H27OrderTypePicker;



