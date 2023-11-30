import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import Counters from "../../modules/md-counters";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";

const CounterPickerContainer = forwardRef((props, ref) => {
	const { children, label = "櫃別", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<TypoWebApiOptionPickerContainer
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/counters`}
			getOptionLabel={Counters.getOptionLabel}
			isOptionEqualToValue={Counters.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoWebApiOptionPickerContainer>
	);
});
CounterPickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CounterPickerContainer.displayName = "CounterPickerContainer";
export default CounterPickerContainer;
