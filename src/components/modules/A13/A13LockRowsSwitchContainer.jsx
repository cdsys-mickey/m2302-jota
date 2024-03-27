import { A13Context } from "@/contexts/A13/A13Context";
import { useContext } from "react";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A13LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a13 = useContext(A13Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a13.readOnly}
			onChange={a13.toggleReadOnly}
			disabled={!a13.canUpdate}
			{...rest}
		/>
	);
};

A13LockRowsSwitchContainer.displayName = "A13LockRowsSwitchContainer";
