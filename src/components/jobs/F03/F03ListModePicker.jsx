import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import F03 from "@/modules/md-c04";
import { OptionPicker } from "@/shared-components";

const F03ListModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				width="9rem"
				dense
				label=""
				options={F03.options}
				getOptionLabel={F03.getOptionLabel}
				isOptionEqualToValue={F03.isOptionEqualToValue}
				defaultValue={F03.getOptionById(F03.ListModes.NOT_REVIEWED)}
				{...rest}
			/>
		);
	})
);

F03ListModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

F03ListModePicker.displayName = "F03ListModePicker";
export default F03ListModePicker;





