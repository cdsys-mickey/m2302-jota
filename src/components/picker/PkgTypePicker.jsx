import PropTypes from "prop-types";
import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import PkgTypes from "@/modules/md-pkg-types";
import { OptionPicker } from "@/shared-components";

export const PkgTypePicker = (props) => {
	const { name, label = "包裝單位", ...rest } = props;
	const { token } = useContext(AuthContext);

	const isOptionEqualToValue = useCallback((option, value) => {
		return PkgTypes.isOptionEqualToValue(option, value);
	}, []);

	const getOptionLabel = useCallback((option) => {
		return PkgTypes.getOptionLabel(option);
	}, []);

	return (
		<OptionPicker
			name={name}
			label={label}
			bearer={token}
			url={`v1/prod/pkg-types`}
			queryParam="qs"
			getOptionLabel={getOptionLabel}
			isOptionEqualToValue={isOptionEqualToValue}
			notFoundText="包裝單位 ${input} 不存在"
			// blurToLookup
			{...rest}
		/>
	);
};

PkgTypePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
};

PkgTypePicker.displayName = "PkgTypePicker";
