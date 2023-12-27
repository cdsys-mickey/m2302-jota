import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A011Context } from "@/contexts/A011/A011Context";

export const A011LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a011 = useContext(A011Context);
	if (a011.gridLoading || !a011.gridData || a011.gridData?.length === 0) {
		return false;
	}

	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a011.lockRows}
			onChange={a011.toggleLockRows}
			{...rest}
		/>
	);
};

A011LockRowsSwitchContainer.displayName = "A011LockRowsSwitchContainer";
