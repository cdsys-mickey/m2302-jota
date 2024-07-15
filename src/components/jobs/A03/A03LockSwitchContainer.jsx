import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A03Context } from "@/contexts/A03/A03Context";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A03LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a03 = useContext(A03Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a03.readOnly}
			onChange={a03.toggleReadOnly}
			disabled={!a03.canUpdate}
			{...rest}
		/>
	);
};

A03LockSwitchContainer.displayName = "A03LockSwitchContainer";
