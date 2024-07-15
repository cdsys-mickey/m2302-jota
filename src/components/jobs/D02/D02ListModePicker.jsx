import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import D02 from "@/modules/md-c04";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const D02ListModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				width="9rem"
				dense
				label=""
				options={D02.options}
				getOptionLabel={D02.getOptionLabel}
				isOptionEqualToValue={D02.isOptionEqualToValue}
				defaultValue={D02.getOptionById(D02.ListModes.NOT_REVIEWED)}
				{...rest}
			/>
		);
	})
);

D02ListModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

D02ListModePicker.displayName = "D02ListModePicker";
export default D02ListModePicker;


