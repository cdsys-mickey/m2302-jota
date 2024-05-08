import { useContext } from "react";
import { DeptUserPicker } from "../../../picker/DeptUserPicker";
import { ZA03CopyAuthContext } from "../../../../contexts/ZA03/ZA03CopyAuthContext";
import { useCallback } from "react";

export const ZA03CopyAuthUserPicker = (props) => {
	const { ...rest } = props;
	const copyAuth = useContext(ZA03CopyAuthContext);

	const handleChange = useCallback(
		(newValue) => {
			copyAuth.setFromUser(newValue);
		},
		[copyAuth]
	);
	return (
		<DeptUserPicker
			filterByServer
			// queryRequired
			onChange={handleChange}
			{...rest}
		/>
	);
};

ZA03CopyAuthUserPicker.displayName = "ZA03CopyAuthUserPicker";
