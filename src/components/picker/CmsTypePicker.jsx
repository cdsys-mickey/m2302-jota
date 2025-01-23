import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import CmsTypes from "../../modules/md-cms-types";
import { OptionPickerWrapper } from "../../shared-components/option-picker/OptionPickerWrapper";

const CmsTypePicker = forwardRef((props, ref) => {
	const { label = "佣金類別", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPickerWrapper
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/prod/cms-types`}
			getOptionLabel={CmsTypes.getOptionLabel}
			isOptionEqualToValue={CmsTypes.isOptionEqualToValue}
			notFoundText="佣金類別 ${id} 不存在"
			// blurToLookup
			{...rest}
		/>
	);
});
CmsTypePicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsTypePicker.displayName = "CmsTypePicker";
export default CmsTypePicker;
