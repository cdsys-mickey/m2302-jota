import Squared2 from "@/modules/md-squared2";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const SquaredPicker2 = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				label=""
				options={Squared2.options}
				getOptionLabel={Squared2.getOptionLabel}
				isOptionEqualToValue={Squared2.isOptionEqualToValue}
				findByInput={Squared2.findOptionByInput}
				blurToLookup
				{...rest}
			/>
		);
	})
);

SquaredPicker2.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

SquaredPicker2.displayName = "SquaredPicker2";
export default SquaredPicker2;
