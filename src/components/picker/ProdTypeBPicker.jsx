import ProdTypeB from "@/modules/ProdTypeB";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { OptionPicker } from "@/shared-components";
import Constants from "@/modules/md-constants";

const ProdTypeBPicker = memo(
	forwardRef((props, ref) => {
		const { label = "品類", ...rest } = props;
		return (
			<OptionPicker
				ref={ref}
				label={label}
				options={ProdTypeB.options}
				getOptionLabel={ProdTypeB.getOptionLabel}
				isOptionEqualToValue={ProdTypeB.isOptionEqualToValue}
				findByInput={ProdTypeB.findByInput}
				notFoundText="品類代號 ${input} 不存在"
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
