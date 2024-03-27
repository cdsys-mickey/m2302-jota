import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useContext } from "react";
import LockSwitch from "../../../../../shared-components/LockSwitch";

export const ZA03AuthLockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={za03.readOnly}
			onChange={za03.toggleReadOnly}
			{...rest}
		/>
	);
};

ZA03AuthLockRowsSwitchContainer.displayName = "ZA03LockRowsSwitchContainer";
