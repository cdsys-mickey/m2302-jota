import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A14Context } from "@/contexts/A14/A14Context";

export const A14LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a14 = useContext(A14Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a14.lockRows}
			onChange={a14.toggleLockRows}
			{...rest}
		/>
	);
};

A14LockRowsSwitchContainer.displayName = "A14LockRowsSwitchContainer";
