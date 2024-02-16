import { AuthContext } from "@/contexts/auth/AuthContext";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import PropTypes from "prop-types";
import { forwardRef, useContext, useMemo } from "react";
import { useWatch } from "react-hook-form";
import Depts from "../../modules/md-depts";

const TypoDeptPickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "門市", ...rest } = props;
	const { token } = useContext(AuthContext);
	const value = useWatch({
		name,
	});

	const text = useMemo(() => {
		return children || Depts.getOptionLabel(value);
	}, [children, value]);

	return (
		<TypoWebApiOptionPickerContainer
			name={name}
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/auth/depts`}
			getOptionLabel={Depts.getOptionLabel}
			isOptionEqualToValue={Depts.isOptionEqualToValue}
			getData={(x) => x}
			{...rest}>
			{text}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoDeptPickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoDeptPickerContainer.displayName = "TypoDeptPickerContainer";
export default TypoDeptPickerContainer;
