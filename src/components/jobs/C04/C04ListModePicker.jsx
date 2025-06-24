import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C04 from "@/modules/md-c04";
import { OptionPicker } from "@/shared-components";

const C04ListModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				width="9rem"
				dense
				label=""
				options={C04.options}
				getOptionLabel={C04.getOptionLabel}
				isOptionEqualToValue={C04.isOptionEqualToValue}
				defaultValue={C04.getOptionById(C04.ListModes.NOT_REVIEWED)}
				{...rest}
			/>
		);
	})
);

C04ListModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

C04ListModePicker.displayName = "C04ListModePicker";
export default C04ListModePicker;
