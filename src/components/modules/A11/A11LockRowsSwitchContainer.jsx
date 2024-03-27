import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A11Context } from "@/contexts/A11/A11Context";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A11LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a11 = useContext(A11Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a11.readOnly}
			onChange={a11.toggleReadOnly}
			disabled={!a11.canUpdate}
			{...rest}
		/>
	);
};

A11LockRowsSwitchContainer.displayName = "A11LockRowsSwitchContainer";
