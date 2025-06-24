import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";
import { P32Context } from "./P32Context";

export const P32LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const p32 = useContext(P32Context);

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={p32.grid.readOnly}
			onChange={p32.grid.toggleReadOnly}
			disabled={!p32.canUpdate}
			{...rest}
		/>
	);
};

P32LockRowsSwitchContainer.displayName = "P32LockRowsSwitchContainer";



