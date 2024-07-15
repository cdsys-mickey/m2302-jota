import { A16Context } from "@/contexts/A16/A16Context";
import { useContext } from "react";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A16LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a16 = useContext(A16Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a16.readOnly}
			onChange={a16.toggleReadOnly}
			{...rest}
		/>
	);
};

A16LockRowsSwitchContainer.displayName = "A16LockRowsSwitchContainer";
