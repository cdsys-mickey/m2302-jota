import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { OptionPicker } from "@/shared-components";
import E01 from "@/modules/E01.mjs";

const E01SquaredPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
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
