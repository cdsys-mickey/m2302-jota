import { A10Context } from "@/contexts/A10/A10Context";
import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";

export const A10LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a10 = useContext(A10Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a10.grid.readOnly}
			onChange={a10.grid.toggleReadOnly}
			disabled={!a10.canUpdate}
			{...rest}
		/>
	);
};

A10LockRowsSwitchContainer.displayName = "A10LockRowsSwitchContainer";
