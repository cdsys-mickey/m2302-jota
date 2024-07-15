import { A26Context } from "@/contexts/A26/A26Context";
import { useContext } from "react";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A26LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a26 = useContext(A26Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a26.readOnly}
			onChange={a26.toggleReadOnly}
			{...rest}
		/>
	);
};

A26LockRowsSwitchContainer.displayName = "A26LockRowsSwitchContainer";
