import { A02Context } from "@/contexts/A02/A02Context";
import { useContext } from "react";
import LockSwitch from "../../../shared-components/LockSwitch";

export const A02LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a02 = useContext(A02Context);

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={a02.readOnly}
			onChange={a02.toggleReadOnly}
			disabled={!a02.canUpdate}
			{...rest}
		/>
	);
};

A02LockRowsSwitchContainer.displayName = "A02LockRowsSwitchContainer";
