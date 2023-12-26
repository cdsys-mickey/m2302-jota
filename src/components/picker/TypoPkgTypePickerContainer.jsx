import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import PkgTypes from "../../modules/md-pkg-types";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import { useWatch } from "react-hook-form";

const TypoPkgTypePickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "包裝單位", ...rest } = props;
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
			url={`v1/prod/pkg-types`}
			getOptionLabel={PkgTypes.getOptionLabel}
			isOptionEqualToValue={PkgTypes.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoPkgTypePickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoPkgTypePickerContainer.displayName = "TypoPkgTypePickerContainer";
export default TypoPkgTypePickerContainer;
