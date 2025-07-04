import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import Counters from "@/modules/md-counters";
import { OptionPicker } from "@/shared-components";

const CounterPicker = forwardRef((props, ref) => {
	const { label = "櫃別", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/counters`}
			getOptionLabel={Counters.getOptionLabel}
			isOptionEqualToValue={Counters.isOptionEqualToValue}
			notFoundText="櫃別 ${input} 不存在"
			// blurToLookup
			{...rest}
		/>
	);
});
CounterPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CounterPicker.displayName = "CounterPicker";
export default CounterPicker;
