import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A09Context } from "@/contexts/A09/A09Context";

export const A09LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a09 = useContext(A09Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a09.lockRows}
			onChange={a09.toggleLockRows}
			{...rest}
		/>
	);
};

A09LockRowsSwitchContainer.displayName = "A09LockRowsSwitchContainer";
