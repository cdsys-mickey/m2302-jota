import A18 from "@/modules/md-a18";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const A18ActionPicker = memo(
	forwardRef((props, ref) => {
		console.log("rendering A18ActionPicker");
		const { name, label = "輸出格式", ...rest } = props;

		return (
			<OptionPickerWrapper
				name={name}
				label={label}
				options={A18.Actions}
				{...rest}
			/>
		);
	})
);

A18ActionPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

A18ActionPicker.displayName = "A18ActionPicker";
export default A18ActionPicker;
