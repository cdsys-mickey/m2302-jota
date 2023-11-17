import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A04Context } from "@/contexts/a04/A04Context";

export const A04LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a04 = useContext(A04Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a04.lockRows}
			onChange={a04.toggleLockRows}
			{...rest}
		/>
	);
};

A04LockRowsSwitchContainer.displayName = "A04LockRowsSwitchContainer";
