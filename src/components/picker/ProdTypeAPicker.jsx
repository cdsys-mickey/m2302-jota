import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeA from "../../modules/md-prod-type-a";
import { ControlledOptionPicker } from "../../shared-components/option-picker/ControlledOptionPicker";
import OptionPicker from "../../shared-components/option-picker/OptionPicker";
import { memo } from "react";
import { OptionPickerWrapper } from "../../shared-components/option-picker/OptionPickerWrapper";

const ProdTypeAPicker = memo(
	forwardRef((props, ref) => {
		const { label = "品別", ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				label={label}
				options={ProdTypeA.options}
				getOptionLabel={ProdTypeA.getOptionLabel}
				isOptionEqualToValue={ProdTypeA.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

ProdTypeAPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

ProdTypeAPicker.displayName = "ProdTypeAPicker";
export default ProdTypeAPicker;
