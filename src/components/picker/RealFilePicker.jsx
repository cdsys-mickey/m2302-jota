import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { memo, useContext } from "react";
import Database from "@/modules/md-database";
import { OptionPickerWrapper } from "@/shared-components/option-picker/OptionPickerWrapper";

export const RealFilePicker = memo((props) => {
	console.log("rendering RealFilePicker");
	const { name, label = "檔案", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<OptionPickerWrapper
			name={name}
			label={label}
			bearer={token}
			url={`v1/app/entities`}
			getOptionLabel={Database.getOptionLabel}
			isOptionEqualToValue={Database.isOptionEqualToValue}
			// blurToLookup
			{...rest}
		/>
	);
});

RealFilePicker.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

RealFilePicker.displayName = "RealFilePicker";
