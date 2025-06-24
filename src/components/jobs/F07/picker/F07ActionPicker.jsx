import F07 from "@/modules/md-f07";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const F07ActionPicker = memo(
	forwardRef((props, ref) => {
		console.log("rendering F07ActionPicker");
		const { name, label = "輸出格式", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				label={label}
				options={F07.Actions}
				{...rest}
			/>
		);
	})
);

F07ActionPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

F07ActionPicker.displayName = "F07ActionPicker";
export default F07ActionPicker;

