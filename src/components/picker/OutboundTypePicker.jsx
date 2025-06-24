import PropTypes from "prop-types";
import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { OptionPicker } from "@/shared-components";
import Codes from "@/shared-modules/md-codes";

export const OutboundTypePicker = (props) => {
	const { name, label = "銷退/報廢原因", ...rest } = props;
	const { token } = useContext(AuthContext);

	const isOptionEqualToValue = useCallback((option, value) => {
		return Codes.isOptionEqualToValue(option, value);
	}, []);

	const getOptionLabel = useCallback((option) => {
		return Codes.getOptionLabel(option);
	}, []);

	return (
		<OptionPicker
			name={name}
			label={label}
			bearer={token}
			url={`v1/prod/outbound-types`}
			// filterByServer
			// queryRequired
			queryParam="qs"
			// querystring={querystring}
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			notFoundText="銷退/報廢原因 ${input} 不存在"
			// blurToLookup
			{...rest}
		/>
	);
};

OutboundTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
};

OutboundTypePicker.displayName = "OutboundTypePicker";
