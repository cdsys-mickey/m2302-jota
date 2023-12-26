import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A08Context } from "@/contexts/A08/A08Context";

export const A08LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a08 = useContext(A08Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a08.lockRows}
			onChange={a08.toggleLockRows}
			{...rest}
		/>
	);
};

A08LockRowsSwitchContainer.displayName = "A08LockRowsSwitchContainer";
