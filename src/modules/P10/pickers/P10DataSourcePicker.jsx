import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P10DataSource from "./P10DataSource.mjs";


const P10DataSourcePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={P10DataSource.options}
			getOptionLabel={P10DataSource.getOptionLabel}
			isOptionEqualToValue={P10DataSource.isOptionEqualToValue}
			findByInput={P10DataSource.findByInput}
			notFoundText="資料來源 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P10DataSourcePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P10DataSourcePicker.displayName = "P10DataSourcePicker";
export default P10DataSourcePicker;




