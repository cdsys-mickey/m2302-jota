import F05 from "@/modules/md-f05";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const F05ActionPicker = memo(
	forwardRef((props, ref) => {
		console.log("rendering F05ActionPicker");
		const { name, label = "輸出格式", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={F05.Actions}
				{...rest}
			/>
		);
	})
);

F05ActionPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

F05ActionPicker.displayName = "F05ActionPicker";
export default F05ActionPicker;

