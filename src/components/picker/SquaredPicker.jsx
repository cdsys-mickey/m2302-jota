import Squared from "@/modules/md-squared";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const SquaredPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				label=""
				options={Squared.squaredOptions}
				getOptionLabel={Squared.getSquaredOptionLabel}
				isOptionEqualToValue={Squared.isOptionEqualToValue}
				// getOptionDisabled={Squared.getSquaredOptionDisabled}
				{...rest}
			/>
		);
	})
);

SquaredPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

SquaredPicker.displayName = "SquaredPicker";
export default SquaredPicker;
