import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A09Context } from "@/contexts/A09/A09Context";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A09LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a09 = useContext(A09Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a09.readOnly}
			onChange={a09.toggleReadOnly}
			disabled={!a09.canUpdate}
			{...rest}
		/>
	);
};

A09LockRowsSwitchContainer.displayName = "A09LockRowsSwitchContainer";
