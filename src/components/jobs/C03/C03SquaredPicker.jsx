import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C03 from "@/modules/md-c03";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import { useCallback } from "react";

const C03SquaredPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				required
				disableClearable
				label=""
				options={C03.squaredOptions}
				getOptionLabel={C03.getSquaredOptionLabel}
				isOptionEqualToValue={C03.isOptionEqualToValue}
				getOptionDisabled={C03.getSquaredOptionDisabled}
				{...rest}
			/>
		);
	})
);

C03SquaredPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

C03SquaredPicker.displayName = "C03SquaredPicker";
export default C03SquaredPicker;