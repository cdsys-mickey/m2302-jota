import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import D07 from "@/modules/md-c04";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const D07ListModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				width="9rem"
				dense
				label=""
				options={D07.options}
				getOptionLabel={D07.getOptionLabel}
				isOptionEqualToValue={D07.isOptionEqualToValue}
				defaultValue={D07.getOptionById(D07.ListModes.NOT_REVIEWED)}
				{...rest}
			/>
		);
	})
);

D07ListModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

D07ListModePicker.displayName = "D07ListModePicker";
export default D07ListModePicker;




