import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A12Context } from "@/contexts/A12/A12Context";

export const A12LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a12 = useContext(A12Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a12.lockRows}
			onChange={a12.toggleLockRows}
			{...rest}
		/>
	);
};

A12LockRowsSwitchContainer.displayName = "A12LockRowsSwitchContainer";