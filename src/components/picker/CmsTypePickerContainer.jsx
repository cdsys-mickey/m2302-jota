import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import CmsTypes from "../../modules/md-cms-types";
import WebApiOptionPicker from "../../shared-components/option-picker/WebApiOptionPicker";

const CmsTypePickerContainer = forwardRef((props, ref) => {
	const { label = "佣金類別", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<WebApiOptionPicker
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/cms-types`}
			getOptionLabel={CmsTypes.getOptionLabel}
			isOptionEqualToValue={CmsTypes.isOptionEqualToValue}
			{...rest}
		/>
	);
});
CmsTypePickerContainer.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsTypePickerContainer.displayName = "CmsTypePickerContainer";
export default CmsTypePickerContainer;
