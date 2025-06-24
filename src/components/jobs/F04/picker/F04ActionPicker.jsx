import F04 from "@/modules/md-f04";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const F04ActionPicker = memo(
	forwardRef((props, ref) => {
		console.log("rendering F04ActionPicker");
		const { name, label = "輸出格式", ...rest } = props;

		return (
			<OptionPicker
				name={name}
				label={label}
				options={F04.Actions}
				{...rest}
			/>
		);
	})
);

F04ActionPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

F04ActionPicker.displayName = "F04ActionPicker";
export default F04ActionPicker;

