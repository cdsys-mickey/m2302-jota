import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import PkgTypes from "../../modules/md-pkg-types";
import TypoWebApiOptionsPickerContainer from "../../shared-components/typo/TypoWebApiOptionsPickerContainer";

const PkyTypePickerContainer = forwardRef((props, ref) => {
	const { children, label = "包裝單位", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<TypoWebApiOptionsPickerContainer
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/pkg-types`}
			getOptionLabel={PkgTypes.getOptionLabel}
			isOptionEqualToValue={PkgTypes.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoWebApiOptionsPickerContainer>
	);
});
PkyTypePickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

PkyTypePickerContainer.displayName = "PkyTypePickerContainer";
export default PkyTypePickerContainer;
