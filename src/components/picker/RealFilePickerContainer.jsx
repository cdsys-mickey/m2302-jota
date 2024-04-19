import { AuthContext } from "@/contexts/auth/AuthContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import WebApiOptionPicker from "../../shared-components/picker/WebApiOptionPicker";
import Database from "../../modules/md-database";
import { ControlledWebApiOptionPicker } from "../../shared-components/controlled/ControlledWebApiOptionPicker";
import { memo } from "react";

export const RealFilePickerContainer = memo((props) => {
	console.log("rendering RealFilePickerContainer");
	const { name, label = "檔案", ...rest } = props;
	const { token } = useContext(AuthContext);

	return (
		<ControlledWebApiOptionPicker
			name={name}
			label={label}
			bearer={token}
			url={`v1/app/entities`}
			getOptionLabel={Database.getOptionLabel}
			isOptionEqualToValue={Database.isOptionEqualToValue}
			{...rest}
		/>
	);
});

RealFilePickerContainer.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	children: PropTypes.node,
};

RealFilePickerContainer.displayName = "RealFilePickerContainer";
