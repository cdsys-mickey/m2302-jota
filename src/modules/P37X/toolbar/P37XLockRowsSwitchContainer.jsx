import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";
import P37XContext from "../P37XContext";

export const P37XLockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const p37x = useContext(P37XContext);

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={p37x.grid.readOnly}
			onChange={p37x.grid.toggleReadOnly}
			disabled={!p37x.canUpdate}
			{...rest}
		/>
	);
};

P37XLockRowsSwitchContainer.displayName = "P37XLockRowsSwitchContainer";

