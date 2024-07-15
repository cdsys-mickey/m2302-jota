import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import D01 from "@/modules/md-c04";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const D01ListModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				width="9rem"
				dense
				label=""
				options={D01.options}
				getOptionLabel={D01.getOptionLabel}
				isOptionEqualToValue={D01.isOptionEqualToValue}
				defaultValue={D01.getOptionById(D01.ListModes.NOT_REVIEWED)}
				{...rest}
			/>
		);
	})
);

D01ListModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

D01ListModePicker.displayName = "D01ListModePicker";
export default D01ListModePicker;

