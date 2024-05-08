import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C01 from "@/modules/md-c01";
import { OptionPickerWrapper } from "@/shared-components/picker/OptionPickerWrapper";

const C01ListModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				width="9rem"
				dense
				label=""
				options={C01.options}
				getOptionLabel={C01.getOptionLabel}
				isOptionEqualToValue={C01.isOptionEqualToValue}
				// defaultValue={C01.getOptionById(
				// 	C01.ListModes.NOT_ORDERED_INCLUDED
				// )}
				{...rest}
			/>
		);
	})
);

C01ListModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

C01ListModePicker.displayName = "C01ListModePicker";
export default C01ListModePicker;
