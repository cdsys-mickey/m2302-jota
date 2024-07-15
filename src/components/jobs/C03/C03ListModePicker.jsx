import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C03 from "@/modules/md-c03";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const C03ListModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				width="8rem"
				dense
				label=""
				options={C03.options}
				getOptionLabel={C03.getOptionLabel}
				isOptionEqualToValue={C03.isOptionEqualToValue}
				// defaultValue={C03.getOptionById(C03.ListModes.NOT_REVIEWED)}
				{...rest}
			/>
		);
	})
);

C03ListModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

C03ListModePicker.displayName = "C03ListModePicker";
export default C03ListModePicker;
