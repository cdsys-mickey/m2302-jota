import { A16GContext } from "@/contexts/A16G/A16GContext";
import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";

export const A16GLockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a16g = useContext(A16GContext);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a16g.readOnly}
			onChange={a16g.toggleReadOnly}
			{...rest}
		/>
	);
};

A16GLockRowsSwitchContainer.displayName = "A16GLockRowsSwitchContainer";

