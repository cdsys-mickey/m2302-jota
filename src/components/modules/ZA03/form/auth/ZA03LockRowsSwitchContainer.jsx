import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const ZA03LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={za03.readOnly}
			onChange={za03.toggleReadOnly}
			{...rest}
		/>
	);
};

ZA03LockRowsSwitchContainer.displayName = "ZA03LockRowsSwitchContainer";
