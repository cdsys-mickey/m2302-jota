import ProdTypeB from "@/modules/md-prod-type-b";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { OptionPickerWrapper } from "../../shared-components/option-picker/OptionPickerWrapper";
import Constants from "@/modules/md-constants";

const ProdTypeBPicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "品類", ...rest } = props;
		return (
			<OptionPickerWrapper
				ref={ref}
				name={name}
				label={label}
				options={ProdTypeB.options}
				getOptionLabel={ProdTypeB.getOptionLabel}
				isOptionEqualToValue={ProdTypeB.isOptionEqualToValue}
				findByInput={ProdTypeB.findByInput}
				{...Constants.STATIC_PICKER_OPTS}
				// blurToLookup
				{...rest}
			/>
		);
	})
);

ProdTypeBPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdTypeBPicker.displayName = "ProdTypeBPicker";
export default ProdTypeBPicker;
