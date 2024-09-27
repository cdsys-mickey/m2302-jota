import E01 from "@/modules/md-e01";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const E01SquaredPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				// required
				disableClearable
				label=""
				options={E01.squaredOptions}
				getOptionLabel={E01.getSquaredOptionLabel}
				isOptionEqualToValue={E01.isOptionEqualToValue}
				getOptionDisabled={E01.getSquaredOptionDisabled}
				findByInput={E01.findSquaredOptionByInput}
				notFoundText="結清註記 ${id} 不存在"
				emptyId
				{...rest}
			/>
		);
	})
);

E01SquaredPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

E01SquaredPicker.displayName = "E01SquaredPicker";
export default E01SquaredPicker;
