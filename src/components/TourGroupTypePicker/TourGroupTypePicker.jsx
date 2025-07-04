import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import TourGroupTypes from "./TourGroupTypes.mjs";

const TourGroupTypePicker = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;

		return (
			<OptionPicker
				ref={ref}
				fullWidth
				options={TourGroupTypes.options}
				getOptionLabel={TourGroupTypes.getOptionLabel}
				isOptionEqualToValue={TourGroupTypes.isOptionEqualToValue}
				findByInput={TourGroupTypes.findOptionByInput}
				notFoundText="團種類 ${input} 不存在"
				getOptionKey={TourGroupTypes.getOptionKey}
				// placeholder="空白: 零售+批發"
				{...rest}
			/>
		);
	})
);

TourGroupTypePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

TourGroupTypePicker.displayName = "TourGroupTypePicker";
export default TourGroupTypePicker;
