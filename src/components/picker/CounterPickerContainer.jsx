import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import Counters from "../../modules/md-counters";
import WebApiOptionPicker from "../../shared-components/picker/WebApiOptionPicker";

const CounterPickerContainer = forwardRef((props, ref) => {
	const { label = "櫃別", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<WebApiOptionPicker
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/counters`}
			getOptionLabel={Counters.getOptionLabel}
			isOptionEqualToValue={Counters.isOptionEqualToValue}
			{...rest}
		/>
	);
});
CounterPickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CounterPickerContainer.displayName = "CounterPickerContainer";
export default CounterPickerContainer;
