import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";
import P37Context from "../P37Context";

export const P37LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const p37 = useContext(P37Context);

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={p37.grid.readOnly}
			onChange={p37.grid.toggleReadOnly}
			disabled={!p37.canUpdate}
			{...rest}
		/>
	);
};

P37LockRowsSwitchContainer.displayName = "P37LockRowsSwitchContainer";
