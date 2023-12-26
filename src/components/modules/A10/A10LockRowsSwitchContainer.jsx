import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A10Context } from "@/contexts/A10/A10Context";

export const A10LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a10 = useContext(A10Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a10.lockRows}
			onChange={a10.toggleLockRows}
			{...rest}
		/>
	);
};

A10LockRowsSwitchContainer.displayName = "A10LockRowsSwitchContainer";
