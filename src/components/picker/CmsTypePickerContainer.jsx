import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import CmsTypes from "../../modules/md-cms-types";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";

const CmsTypePickerContainer = forwardRef((props, ref) => {
	const { children, label = "佣金類別", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<TypoWebApiOptionPickerContainer
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/cms-types`}
			getOptionLabel={CmsTypes.getOptionLabel}
			isOptionEqualToValue={CmsTypes.isOptionEqualToValue}
			{...rest}>
			{children}
		</TypoWebApiOptionPickerContainer>
	);
});
CmsTypePickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsTypePickerContainer.displayName = "CmsTypePickerContainer";
export default CmsTypePickerContainer;