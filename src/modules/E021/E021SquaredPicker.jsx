import E021 from "@/modules/E021/E021.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const E021SquaredPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				fullWidth
				// required
				disableClearable
				label=""
				options={E021.squaredOptions}
				getOptionLabel={E021.getSquaredOptionLabel}
				isOptionEqualToValue={E021.isSquaredOptionEqualToValue}
				getOptionDisabled={E021.getSquaredOptionDisabled}
				findByInput={E021.findSquaredOptionByInput}
				notFoundText="結清註記 ${input} 不存在"
				emptyId
				{...rest}
			/>
		);
	})
);

E021SquaredPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

E021SquaredPicker.displayName = "E021SquaredPicker";
export default E021SquaredPicker;

