import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import PropTypes from "prop-types";
import { forwardRef, useContext } from "react";
import CmsBusComps from "./CmsBusComps";

const CmsBusCompPicker = forwardRef((props, ref) => {
	const { label = "車行", forId = false, ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPicker
			label={label}
			ref={ref}
			bearer={token}
			url={`v1/cms/bus-comps`}
			getOptionLabel={forId ? CmsBusComps.getOptionLabelForId : CmsBusComps.getOptionLabel}
			isOptionEqualToValue={CmsBusComps.isOptionEqualToValue}
			notFoundText="車行 ${input} 不存在"
			renderOptionLabel={CmsBusComps.getOptionLabel}
			virtualize
			// blurToLookup
			{...rest}
		/>
	);
});
CmsBusCompPicker.propTypes = {
	label: PropTypes.string,
	children: PropTypes.node,
	forId: PropTypes.bool
};

CmsBusCompPicker.displayName = "CmsBusCompPicker";
export default CmsBusCompPicker;
