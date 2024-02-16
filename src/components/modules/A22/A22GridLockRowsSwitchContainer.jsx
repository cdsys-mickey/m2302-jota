import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A22Context } from "@/contexts/A22/A22Context";

export const A22GridLockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a22 = useContext(A22Context);
	if (a22.gridLoading || !a22.gridData || a22.gridData?.length === 0) {
		return false;
	}

	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a22.readOnly}
			// onChange={a22.toggleEditorLock}
			onChange={a22.toggleReadOnly}
			{...rest}
		/>
	);
};

A22GridLockRowsSwitchContainer.displayName = "A22GridLockRowsSwitchContainer";
