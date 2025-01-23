import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import YesOrEmpty from "@/modules/md-yes-or-empty";
import Constants from "@/modules/md-constants";

const YesOrEmptyPicker = forwardRef((props, ref) => {
	const { label = "是否", ...rest } = props;

	return (
		<OptionPickerWrapper
			ref={ref}
			label={label}
			options={YesOrEmpty.options}
			getOptionLabel={YesOrEmpty.getOptionLabel}
			isOptionEqualToValue={YesOrEmpty.isOptionEqualToValue}
			findByInput={YesOrEmpty.findByInput}
			notFoundText="${id} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			{...rest}
		/>
	);
});
YesOrEmptyPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

YesOrEmptyPicker.displayName = "YesOrEmptyPicker";
export default YesOrEmptyPicker;
