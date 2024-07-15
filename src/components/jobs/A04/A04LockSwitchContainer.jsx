import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A04Context } from "@/contexts/A04/A04Context";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A04LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a04 = useContext(A04Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a04.readOnly}
			onChange={a04.toggleReadOnly}
			disabled={!a04.canUpdate}
			{...rest}
		/>
	);
};

A04LockSwitchContainer.displayName = "A04LockSwitchContainer";
