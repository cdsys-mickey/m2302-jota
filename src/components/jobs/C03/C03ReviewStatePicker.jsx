import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C03 from "@/modules/md-c03";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const C03ReviewStatePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				width="13rem"
				dense
				label=""
				options={C03.options}
				getOptionLabel={C03.getOptionLabel}
				isOptionEqualToValue={C03.isOptionEqualToValue}
				// defaultValue={C03.getOptionById(C03.ReviewStates.NOT_REVIEWED)}
				{...rest}
			/>
		);
	})
);

C03ReviewStatePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

C03ReviewStatePicker.displayName = "C03ReviewStatePicker";
export default C03ReviewStatePicker;
