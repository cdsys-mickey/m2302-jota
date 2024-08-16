import { A04Context } from "@/contexts/A04/A04Context";
import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";

export const A04LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a04 = useContext(A04Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a04.grid.readOnly}
			onChange={a04.grid.toggleReadOnly}
			disabled={!a04.canUpdate}
			{...rest}
		/>
	);
};

A04LockSwitchContainer.displayName = "A04LockSwitchContainer";
