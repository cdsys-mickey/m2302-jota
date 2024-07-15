import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import { useWatch } from "react-hook-form";
import { TypoWebApiOptionPickerContainer } from "@/shared-components/typo/TypoWebApiOptionPickerContainer";
import CmsTypes from "@/modules/md-cms-types";

const TypoCmsTypePickerContainer = forwardRef((props, ref) => {
	const { name, children, label = "佣金類別", ...rest } = props;
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
			url={`v1/prod/cms-types`}
			getOptionLabel={CmsTypes.getOptionLabel}
			isOptionEqualToValue={CmsTypes.isOptionEqualToValue}
			{...rest}>
			{children || CmsTypes.getOptionLabel(value)}
		</TypoWebApiOptionPickerContainer>
	);
});
TypoCmsTypePickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

TypoCmsTypePickerContainer.displayName = "TypoCmsTypePickerContainer";
export default TypoCmsTypePickerContainer;
