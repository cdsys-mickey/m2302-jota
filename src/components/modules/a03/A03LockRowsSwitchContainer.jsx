import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A03Context } from "@/contexts/a03/A03Context";

export const A03LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a03 = useContext(A03Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a03.lockRows}
			onChange={a03.toggleLockRows}
			{...rest}
		/>
	);
};

A03LockRowsSwitchContainer.displayName = "A03LockRowsSwitchContainer";
