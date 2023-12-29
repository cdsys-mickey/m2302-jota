import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeB from "@/modules/md-prod-type-b";
import OptionPicker from "@/shared-components/picker/OptionPicker";
import { memo } from "react";
import { ControlledOptionPicker } from "../../shared-components/controlled/ControlledOptionPicker";

const ProdTypeBPicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "品類", ...rest } = props;
		if (name) {
			return (
				<ControlledOptionPicker
					name={name}
					label={label}
					options={ProdTypeB.options}
					getOptionLabel={ProdTypeB.getOptionLabel}
					isOptionEqualToValue={ProdTypeB.isOptionEqualToValue}
					{...rest}
				/>
			);
		} else {
			return (
				<OptionPicker
					ref={ref}
					label={label}
					options={ProdTypeB.options}
					getOptionLabel={ProdTypeB.getOptionLabel}
					isOptionEqualToValue={ProdTypeB.isOptionEqualToValue}
					{...rest}
				/>
			);
		}
	})
);

ProdTypeBPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

ProdTypeBPicker.displayName = "ProdTypeBPicker";
export default ProdTypeBPicker;
