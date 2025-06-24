import F06 from "@/modules/md-f06";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const F06ActionPicker = memo(
	forwardRef((props, ref) => {
		console.log("rendering F06ActionPicker");
		const { name, label = "輸出格式", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				label={label}
				options={F06.Actions}
				{...rest}
			/>
		);
	})
);

F06ActionPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

F06ActionPicker.displayName = "F06ActionPicker";
export default F06ActionPicker;

