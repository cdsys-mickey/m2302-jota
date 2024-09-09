import C03 from "@/modules/md-c03";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const C03SquaredPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPickerWrapper
				ref={ref}
				fullWidth
				// required
				disableClearable
				label=""
				options={C03.squaredOptions}
				getOptionLabel={C03.getSquaredOptionLabel}
				isOptionEqualToValue={C03.isOptionEqualToValue}
				getOptionDisabled={C03.getSquaredOptionDisabled}
				findByInput={C03.findSquaredOptionByInput}
				notFoundText="結清註記 ${id} 不存在"
				emptyId
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
