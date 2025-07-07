import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";
import P38Context from "../P38Context";

export const P38LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const p38 = useContext(P38Context);

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={p38.grid.readOnly}
			onChange={p38.grid.toggleReadOnly}
			disabled={!p38.canUpdate}
			{...rest}
		/>
	);
};

P38LockRowsSwitchContainer.displayName = "P38LockRowsSwitchContainer";

