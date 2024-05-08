import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C02 from "@/modules/md-c02";
import { OptionPickerWrapper } from "@/shared-components/picker/OptionPickerWrapper";

const C02ListModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				width="9rem"
				dense
				label=""
				options={C02.options}
				getOptionLabel={C02.getOptionLabel}
				isOptionEqualToValue={C02.isOptionEqualToValue}
				// defaultValue={C02.getOptionById(C02.ListModes.NOT_REVIEWED)}
				{...rest}
			/>
		);
	})
);

C02ListModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

C02ListModePicker.displayName = "C02ListModePicker";
export default C02ListModePicker;
