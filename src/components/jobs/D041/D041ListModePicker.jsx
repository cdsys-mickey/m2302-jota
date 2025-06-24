import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import D041 from "@/modules/md-c04";
import { OptionPicker } from "@/shared-components";

const D041ListModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				width="9rem"
				dense
				label=""
				options={D041.options}
				getOptionLabel={D041.getOptionLabel}
				isOptionEqualToValue={D041.isOptionEqualToValue}
				defaultValue={D041.getOptionById(D041.ListModes.NOT_REVIEWED)}
				{...rest}
			/>
		);
	})
);

D041ListModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

D041ListModePicker.displayName = "D041ListModePicker";
export default D041ListModePicker;



