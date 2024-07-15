import { useCallback, useContext } from "react";
import { ZA03CopyAuthContext } from "@/contexts/ZA03/ZA03CopyAuthContext";
import { OptionPickerProvider } from "@/shared-components/option-picker/OptionPickerProvider";
import { DeptUserPicker } from "../../../picker/DeptUserPicker";

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
		<OptionPickerProvider>
			<DeptUserPicker
				// filterByServer
				// queryRequired
				virtualize
				onChange={handleChange}
				{...rest}
			/>
		</OptionPickerProvider>
	);
};

ZA03CopyAuthUserPicker.displayName = "ZA03CopyAuthUserPicker";
