import E03 from "@/modules/E03.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const E03SquaredPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				fullWidth
				// required
				disableClearable
				label=""
				options={E03.squaredOptions}
				getOptionLabel={E03.getSquaredOptionLabel}
				isOptionEqualToValue={E03.isSquaredOptionEqualToValue}
				getOptionDisabled={E03.getSquaredOptionDisabled}
				findByInput={E03.findSquaredOptionByInput}
				notFoundText="結清註記 ${input} 不存在"
				emptyId
				{...rest}
			/>
		);
	})
);

E03SquaredPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

E03SquaredPicker.displayName = "E03SquaredPicker";
export default E03SquaredPicker;


