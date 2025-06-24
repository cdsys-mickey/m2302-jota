import G09 from "@/modules/G09/G09.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const G09DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				label={label}
				options={G09.dataTypeOptions}
				getOptionLabel={G09.getOptionLabel}
				isOptionEqualToValue={G09.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

G09DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

G09DataTypePicker.displayName = "G09DataTypePicker";
export default G09DataTypePicker;







