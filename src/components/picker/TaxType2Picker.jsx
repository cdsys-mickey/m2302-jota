import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import TaxTypes2 from "@/modules/md-tax-types2";
import { OptionPicker } from "@/shared-components";
import Constants from "@/modules/md-constants";

const TaxType2Picker = memo(
	forwardRef((props, ref) => {
		const { name, label = "稅別", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				ref={ref}
				label={label}
				options={TaxTypes2.options}
				getOptionLabel={TaxTypes2.getOptionLabel}
				isOptionEqualToValue={TaxTypes2.isOptionEqualToValue}
				findByInput={TaxTypes2.findByInput}
				{...Constants.STATIC_PICKER_OPTS}
				// blurToLookup
				{...rest}
			/>
		);
	})
);
TaxType2Picker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TaxType2Picker.displayName = "TaxType2Picker";
export default TaxType2Picker;
