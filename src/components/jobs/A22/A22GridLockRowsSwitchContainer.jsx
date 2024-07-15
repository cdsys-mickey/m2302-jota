import { A22Context } from "@/contexts/A22/A22Context";
import { useContext } from "react";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A22GridLockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a22 = useContext(A22Context);
	if (a22.gridLoading || !a22.gridData || a22.gridData?.length === 0) {
		return false;
	}

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a22.readOnly}
			// onChange={a22.toggleEditorLock}
			onChange={a22.toggleReadOnly}
			{...rest}
		/>
	);
};

A22GridLockRowsSwitchContainer.displayName = "A22GridLockRowsSwitchContainer";
