import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A11Context } from "@/contexts/A11/A11Context";

export const A11LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a11 = useContext(A11Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a11.lockRows}
			onChange={a11.toggleLockRows}
			{...rest}
		/>
	);
};

A11LockRowsSwitchContainer.displayName = "A11LockRowsSwitchContainer";
