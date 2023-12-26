import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A26Context } from "@/contexts/A26/A26Context";

export const A26LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a26 = useContext(A26Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a26.lockRows}
			onChange={a26.toggleLockRows}
			{...rest}
		/>
	);
};

A26LockRowsSwitchContainer.displayName = "A26LockRowsSwitchContainer";
