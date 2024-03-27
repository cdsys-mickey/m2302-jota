import { useContext } from "react";
import UserDeptPicker from "@/components/UserDeptPicker";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const ZA03AuthDeptPickerContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	return (
		<UserDeptPicker
			label="目前門市"
			uid={za03.itemData?.UID}
			value={za03.selectedDept}
			onChange={za03.handleDeptChange}
			disabled={za03.authEditing}
			{...rest}
		/>
	);
};

ZA03AuthDeptPickerContainer.displayName = "ZA03AuthDeptPickerContainer";
