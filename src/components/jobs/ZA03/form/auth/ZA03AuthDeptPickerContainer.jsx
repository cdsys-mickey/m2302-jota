import { useContext } from "react";
import UserDeptPicker from "@/components/UserDeptPicker";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const ZA03AuthDeptPickerContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	return (
		<UserDeptPicker
			disableClearable
			// filterSelectedOptions
			blurOnSelect
			selectOnFocus
			// disableLazy
			// disableOnSingleOption

			uid={za03.itemData?.UID}
			value={za03.selectedDept}
			onChange={za03.handleAuthDeptChange}
			disabled={za03.authGridEditing}
			{...rest}
		/>
	);
};

ZA03AuthDeptPickerContainer.displayName = "ZA03AuthDeptPickerContainer";
