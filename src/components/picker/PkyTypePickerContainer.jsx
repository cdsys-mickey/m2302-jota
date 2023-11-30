import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import PkgTypes from "../../modules/md-pkg-types";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";

const PkyTypePickerContainer = forwardRef((props, ref) => {
	const { children, label = "包裝單位", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<TypoWebApiOptionPickerContainer
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/pkg-types`}
			getOptionLabel={PkgTypes.getOptionLabel}
			isOptionEqualToValue={PkgTypes.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoWebApiOptionPickerContainer>
	);
});
PkyTypePickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

PkyTypePickerContainer.displayName = "PkyTypePickerContainer";
export default PkyTypePickerContainer;
