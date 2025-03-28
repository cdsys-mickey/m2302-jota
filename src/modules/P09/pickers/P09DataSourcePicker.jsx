import Constants from "@/modules/md-constants";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import P09DataSource from "./P09DataSource.mjs";


const P09DataSourcePicker = forwardRef((props, ref) => {
	const { name, label = "排序方式", ...rest } = props;

	return (
		<OptionPickerWrapper
			name={name}
			ref={ref}
			label={label}
			options={P09DataSource.options}
			getOptionLabel={P09DataSource.getOptionLabel}
			isOptionEqualToValue={P09DataSource.isOptionEqualToValue}
			findByInput={P09DataSource.findByInput}
			notFoundText="資料來源 ${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
P09DataSourcePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

P09DataSourcePicker.displayName = "P09DataSourcePicker";
export default P09DataSourcePicker;



