import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C03 from "@/modules/md-c03";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const C03ReviewModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				// width="8rem"
				// dense
				label=""
				options={C03.options}
				getOptionLabel={C03.getOptionLabel}
				isOptionEqualToValue={C03.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

C03ReviewModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

C03ReviewModePicker.displayName = "C03ReviewModePicker";
export default C03ReviewModePicker;
