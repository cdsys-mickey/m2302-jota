import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, memo, useContext } from "react";
import Hotels from "./Hotels.mjs";

const HotelPicker = memo(
	forwardRef((props, ref) => {
		const { label = "旅行社", forId = false, ...rest } = props;
		const { token } = useContext(AuthContext);

		return (
			<OptionPicker
				label={label}
				ref={ref}
				bearer={token}
				url={`v1/cms/hotels`}
				getOptionLabel={forId ? Hotels.getOptionLabelForId : Hotels.getOptionLabel}
				isOptionEqualToValue={Hotels.isOptionEqualToValue}
				renderOptionLabel={Hotels.getOptionLabel}
				notFoundText="旅行社 ${input} 不存在"
				virtualize
				{...rest}
			/>
		);
	})
);

HotelPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	forId: PropTypes.bool
};

HotelPicker.displayName = "HotelPicker";
export default HotelPicker;
