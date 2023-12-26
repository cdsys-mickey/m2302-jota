import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A15Context } from "@/contexts/A15/A15Context";

export const A15LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a15 = useContext(A15Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a15.lockRows}
			onChange={a15.toggleLockRows}
			{...rest}
		/>
	);
};

A15LockRowsSwitchContainer.displayName = "A15LockRowsSwitchContainer";
