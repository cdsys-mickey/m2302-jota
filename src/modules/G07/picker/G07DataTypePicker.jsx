import G07 from "@/modules/G07/G07.mjs";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const G07DataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={G07.dataTypeOptions}
				getOptionLabel={G07.getOptionLabel}
				isOptionEqualToValue={G07.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

G07DataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

G07DataTypePicker.displayName = "G07DataTypePicker";
export default G07DataTypePicker;









