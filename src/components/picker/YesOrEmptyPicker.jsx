import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPicker } from "@/shared-components";
import YesOrEmpty from "@/modules/YesOrEmpty.mjs";
import Constants from "@/modules/md-constants";

const YesOrEmptyPicker = forwardRef((props, ref) => {
	const { label = "是否", ...rest } = props;

	return (
		<OptionPicker
			ref={ref}
			label={label}
			options={YesOrEmpty.options}
			getOptionLabel={YesOrEmpty.getOptionLabel}
			isOptionEqualToValue={YesOrEmpty.isOptionEqualToValue}
			findByInput={YesOrEmpty.findByInput}
			notFoundText="${input} 不存在"
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
