import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import Counters from "@/modules/md-counters";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import { useWatch } from "react-hook-form";

export const TypoCounterPickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "櫃別", ...rest } = props;
	const { token } = useContext(AuthContext);
	const value = useWatch({
		name,
	});
	return (
		<TypoWebApiOptionPickerContainer
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/counters`}
			getOptionLabel={Counters.getOptionLabel}
			isOptionEqualToValue={Counters.isOptionEqualToValue}
			{...rest}>
			{children || Counters.getOptionLabel(value)}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoCounterPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoCounterPickerContainer.displayName = "TypoCounterPickerContainer";
