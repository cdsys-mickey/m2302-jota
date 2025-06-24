import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";
import { P13Context } from "./P13Context";

export const P13LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const p13 = useContext(P13Context);

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={p13.grid.readOnly}
			onChange={p13.grid.toggleReadOnly}
			disabled={!p13.canUpdate}
			{...rest}
		/>
	);
};

P13LockRowsSwitchContainer.displayName = "P13LockRowsSwitchContainer";

