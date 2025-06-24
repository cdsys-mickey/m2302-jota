import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";
import { P33Context } from "./P33Context";

export const P33LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const p33 = useContext(P33Context);

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={p33.grid.readOnly}
			onChange={p33.grid.toggleReadOnly}
			disabled={!p33.canUpdate}
			{...rest}
		/>
	);
};

P33LockRowsSwitchContainer.displayName = "P33LockRowsSwitchContainer";




