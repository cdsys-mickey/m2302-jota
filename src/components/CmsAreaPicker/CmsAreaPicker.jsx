import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPicker } from "@/shared-components";
import Constants from "@/modules/md-constants";
import CmsAreas from "./CmsAreas.mjs";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";

const CmsAreaPicker = forwardRef((props, ref) => {
	const { label = "縣市區域", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			ref={ref}
			label={label}
			bearer={token}
			url="v1/cms/areas"
			getOptionLabel={CmsAreas.getOptionLabel}
			isOptionEqualToValue={CmsAreas.isOptionEqualToValue}
			findByInput={CmsAreas.findByInput}
			notFoundText="地區 ${input} 不存在"
			// {...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
CmsAreaPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsAreaPicker.displayName = "CmsAreaPicker";
export default CmsAreaPicker;
