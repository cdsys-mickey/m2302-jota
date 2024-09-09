import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import C06 from "@/modules/md-c06";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

const C06SquaredPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				required
				disableClearable
				label=""
				options={C06.squaredOptions}
				getOptionLabel={C06.getSquaredOptionLabel}
				isOptionEqualToValue={C06.isOptionEqualToValue}
				getOptionDisabled={C06.getSquaredOptionDisabled}
				findByInput={C06.findSquaredOptionByInput}
				emptyId
				{...rest}
			/>
		);
	})
);

C06SquaredPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

C06SquaredPicker.displayName = "C06SquaredPicker";
export default C06SquaredPicker;
