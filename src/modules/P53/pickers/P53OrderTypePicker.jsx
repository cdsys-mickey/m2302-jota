import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P53OrderType from "./P53OrderType.mjs";


const P53OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P53OrderType.options}
			getOptionLabel={P53OrderType.getOptionLabel}
			isOptionEqualToValue={P53OrderType.isOptionEqualToValue}
			findByInput={P53OrderType.findByInput}
			notFoundText="排序方式 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P53OrderTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P53OrderTypePicker.displayName = "P53OrderTypePicker";
export default P53OrderTypePicker;

