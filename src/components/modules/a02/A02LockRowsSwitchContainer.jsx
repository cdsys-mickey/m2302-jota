import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A02Context } from "@/contexts/A02/A02Context";

export const A02LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a02 = useContext(A02Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a02.lockRows}
			onChange={a02.toggleLockRows}
			{...rest}
		/>
	);
};

A02LockRowsSwitchContainer.displayName = "A02LockRowsSwitchContainer";
