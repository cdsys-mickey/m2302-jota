import { A08Context } from "@/contexts/A08/A08Context";
import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";

export const A08LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a08 = useContext(A08Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a08.grid.readOnly}
			onChange={a08.grid.toggleReadOnly}
			disabled={!a08.canUpdate}
			{...rest}
		/>
	);
};

A08LockSwitchContainer.displayName = "A08LockSwitchContainer";
