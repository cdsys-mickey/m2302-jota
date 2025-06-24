import PropTypes from "prop-types";
import { forwardRef } from "react";
import { OptionPicker } from "@/shared-components";
import Constants from "@/modules/md-constants";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import CmsCities from "./CmsCities.mjs";

const CmsCityPicker = forwardRef((props, ref) => {
	const { label = "縣 市", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			ref={ref}
			label={label}
			bearer={token}
			url="v1/cms/cities"
			getOptionLabel={CmsCities.getOptionLabel}
			isOptionEqualToValue={CmsCities.isOptionEqualToValue}
			findByInput={CmsCities.findByInput}
			notFoundText="縣市 ${input} 不存在"
			{...Constants.STATIC_PICKER_OPTS}
			// blurToLookup
			{...rest}
		/>
	);
});
CmsCityPicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

CmsCityPicker.displayName = "CmsCityPicker";
export default CmsCityPicker;
