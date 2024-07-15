import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import D06 from "@/modules/md-c04";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const D06ListModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				width="9rem"
				dense
				label=""
				options={D06.options}
				getOptionLabel={D06.getOptionLabel}
				isOptionEqualToValue={D06.isOptionEqualToValue}
				defaultValue={D06.getOptionById(D06.ListModes.NOT_REVIEWED)}
				{...rest}
			/>
		);
	})
);

D06ListModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

D06ListModePicker.displayName = "D06ListModePicker";
export default D06ListModePicker;



