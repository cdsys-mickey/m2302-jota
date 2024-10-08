import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A12Context } from "@/contexts/A12/A12Context";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A12LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a12 = useContext(A12Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a12.readOnly}
			onChange={a12.toggleReadOnly}
			disabled={!a12.canUpdate}
			{...rest}
		/>
	);
};

A12LockRowsSwitchContainer.displayName = "A12LockRowsSwitchContainer";
