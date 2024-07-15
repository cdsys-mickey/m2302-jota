import { A15Context } from "@/contexts/A15/A15Context";
import { useContext } from "react";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A15LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a15 = useContext(A15Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a15.readOnly}
			onChange={a15.toggleReadOnly}
			{...rest}
		/>
	);
};

A15LockRowsSwitchContainer.displayName = "A15LockRowsSwitchContainer";
