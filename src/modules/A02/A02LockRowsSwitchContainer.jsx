import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";
import { A02Context } from "./A02Context";

export const A02LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a02 = useContext(A02Context);

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a02.grid.readOnly}
			onChange={a02.grid.toggleReadOnly}
			disabled={!a02.canUpdate}
			{...rest}
		/>
	);
};

A02LockRowsSwitchContainer.displayName = "A02LockRowsSwitchContainer";
