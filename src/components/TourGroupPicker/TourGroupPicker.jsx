import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo, useContext } from "react";
import TourGroups from "./TourGroups.mjs";

const TourGroupPicker = memo(
	forwardRef((props, ref) => {
		const { label = "旅行社", forId = false, ...rest } = props;
		const { token } = useContext(AuthContext);

		return (
			<OptionPicker
				label={label}
				ref={ref}
				bearer={token}
				url={`v1/cms/tour-groups`}
				getOptionLabel={forId ? TourGroups.getOptionLabelForId : TourGroups.getOptionLabel}
				isOptionEqualToValue={TourGroups.isOptionEqualToValue}
				renderOptionLabel={TourGroups.getOptionLabel}
				notFoundText="旅行社 ${input} 不存在"
				virtualize
				{...rest}
			/>
		);
	})
);

TourGroupPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	forId: PropTypes.bool
};

TourGroupPicker.displayName = "TourGroupPicker";
export default TourGroupPicker;
