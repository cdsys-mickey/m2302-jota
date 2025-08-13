import REB from "@/modules/REB/REB.mjs";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const REBDataTypePicker = memo(
	forwardRef((props, ref) => {
		const { name, label = "資料類型", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				label={label}
				options={REB.dataTypeOptions}
				getOptionLabel={REB.getOptionLabel}
				isOptionEqualToValue={REB.isOptionEqualToValue}
				{...rest}
			/>
		);
	})
);

REBDataTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

REBDataTypePicker.displayName = "REBDataTypePicker";
export default REBDataTypePicker;










