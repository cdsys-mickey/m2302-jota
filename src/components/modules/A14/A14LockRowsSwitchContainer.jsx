import { A14Context } from "@/contexts/A14/A14Context";
import { useContext } from "react";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A14LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a14 = useContext(A14Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a14.readOnly}
			onChange={a14.toggleReadOnly}
			{...rest}
		/>
	);
};

A14LockRowsSwitchContainer.displayName = "A14LockRowsSwitchContainer";
