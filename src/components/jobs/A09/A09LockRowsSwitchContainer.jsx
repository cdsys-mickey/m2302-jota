import { A09Context } from "@/contexts/A09/A09Context";
import { useContext } from "react";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A09LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a09 = useContext(A09Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a09.grid.readOnly}
			onChange={a09.grid.toggleReadOnly}
			disabled={!a09.canUpdate}
			{...rest}
		/>
	);
};

A09LockRowsSwitchContainer.displayName = "A09LockRowsSwitchContainer";
