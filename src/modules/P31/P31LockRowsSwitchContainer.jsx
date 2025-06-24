import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";
import { P31Context } from "./P31Context";

export const P31LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const p31 = useContext(P31Context);

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={p31.grid.readOnly}
			onChange={p31.grid.toggleReadOnly}
			disabled={!p31.canUpdate}
			{...rest}
		/>
	);
};

P31LockRowsSwitchContainer.displayName = "P31LockRowsSwitchContainer";


