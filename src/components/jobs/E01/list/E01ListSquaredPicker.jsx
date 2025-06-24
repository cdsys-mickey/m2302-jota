import E01 from "@/modules/E01.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const E01ListSquaredPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				fullWidth
				// required
				// disableClearable
				label=""
				options={E01.listSquaredOptions}
				getOptionLabel={E01.getSquaredOptionLabel}
				isOptionEqualToValue={E01.isSquaredOptionEqualToValue}
				getOptionDisabled={E01.getSquaredOptionDisabled}
				findByInput={E01.findSquaredOptionByInput}
				notFoundText="結清註記 ${input} 不存在"
				emptyId
				{...rest}
			/>
		);
	})
);

E01ListSquaredPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

E01ListSquaredPicker.displayName = "E01ListSquaredPicker";
export default E01ListSquaredPicker;
