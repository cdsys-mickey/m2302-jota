import Constants from "@/modules/md-constants";
import Squared from "@/modules/md-squared";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const SquaredPicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				fullWidth
				label=""
				options={Squared.squaredOptions}
				getOptionLabel={Squared.getSquaredOptionLabel}
				isOptionEqualToValue={Squared.isOptionEqualToValue}
				findByInput={Squared.findSquaredOptionByInput}
				// getOptionDisabled={Squared.getSquaredOptionDisabled}
				// blurToLookup
				{...Constants.STATIC_PICKER_OPTS}
				{...rest}
			/>
		);
	})
);

SquaredPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

SquaredPicker.displayName = "SquaredPicker";
export default SquaredPicker;
