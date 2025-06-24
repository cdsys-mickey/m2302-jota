import G05 from "@/modules/G05/G05.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const G05DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				label={label}
				options={G05.dataTypeOptions}
				getOptionLabel={G05.getOptionLabel}
				isOptionEqualToValue={G05.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

G05DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

G05DataTypePicker.displayName = "G05DataTypePicker";
export default G05DataTypePicker;






