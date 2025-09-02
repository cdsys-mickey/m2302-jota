import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import P41FilterMode from "./P41FilterModes";

const P41FilterModePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				// width="8rem"
				// dense
				label=""
				options={P41FilterMode.options}
				getOptionLabel={P41FilterMode.getOptionLabel}
				isOptionEqualToValue={P41FilterMode.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

P41FilterModePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

P41FilterModePicker.displayName = "P41FilterModePicker";
export default P41FilterModePicker;
