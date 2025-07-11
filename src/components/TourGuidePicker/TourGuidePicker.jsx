import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo, useContext } from "react";
import TourGuides from "./TourGuides.mjs";

const TourGuidePicker = memo(
	forwardRef((props, ref) => {
		const { label = "導遊", forId = false, ...rest } = props;
		const { token } = useContext(AuthContext);

		return (
			<OptionPicker
				label={label}
				ref={ref}
				bearer={token}
				url={`v1/cms/tour-guides`}
				getOptionLabel={forId ? TourGuides.getOptionLabelForId : TourGuides.getOptionLabel}
				isOptionEqualToValue={TourGuides.isOptionEqualToValue}
				renderOptionLabel={TourGuides.getOptionLabel}
				notFoundText="導遊 ${input} 不存在"
				virtualize
				{...rest}
			/>
		);
	})
);

TourGuidePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	forId: PropTypes.bool
};

TourGuidePicker.displayName = "TourGuidePicker";
export default TourGuidePicker;
