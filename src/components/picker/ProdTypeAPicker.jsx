import PropTypes from "prop-types";
import { forwardRef } from "react";
import ProdTypeA from "../../modules/md-prod-type-a";
import { ControlledOptionPicker } from "../../shared-components/controlled/ControlledOptionPicker";
import OptionPicker from "../../shared-components/picker/OptionPicker";
import { memo } from "react";

const ProdTypeAPicker = memo(
	forwardRef((props, ref) => {
		const { name, readOnly = false, label = "品別", ...rest } = props;

		if (name) {
			return (
				<ControlledOptionPicker
					name={name}
					readOnly={readOnly}
					label={label}
					options={ProdTypeA.options}
					getOptionLabel={ProdTypeA.getOptionLabel}
					isOptionEqualToValue={ProdTypeA.isOptionEqualToValue}
					{...rest}
				/>
			);
		} else {
			return (
				<OptionPicker
					readOnly={readOnly}
					ref={ref}
					label={label}
					options={ProdTypeA.options}
					getOptionLabel={ProdTypeA.getOptionLabel}
					isOptionEqualToValue={ProdTypeA.isOptionEqualToValue}
					{...rest}
				/>
			);
		}
	})
);

ProdTypeAPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

ProdTypeAPicker.displayName = "ProdTypeAPicker";
export default ProdTypeAPicker;
