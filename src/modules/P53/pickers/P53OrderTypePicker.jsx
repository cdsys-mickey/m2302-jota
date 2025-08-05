import Constants from "@/modules/md-constants";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P53OrderTypes from "./P53OrderTypes.mjs";


const P53OrderTypePicker = forwardRef((props, ref) => {
	const { name, label = "條件別", ...rest } = props;

	return (
		<OptionPicker
			name={name}
			ref={ref}
			label={label}
			options={P53OrderTypes.options}
			getOptionLabel={P53OrderTypes.getOptionLabel}
			isOptionEqualToValue={P53OrderTypes.isOptionEqualToValue}
			findByInput={P53OrderTypes.findByInput}
			notFoundText="條件別 ${input} 不存在"
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

