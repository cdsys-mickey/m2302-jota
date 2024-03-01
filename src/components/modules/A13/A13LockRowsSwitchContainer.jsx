import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A13Context } from "@/contexts/A13/A13Context";

export const A13LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a13 = useContext(A13Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a13.readOnly}
			onChange={a13.toggleReadOnly}
			disabled={!a13.canUpdate}
			{...rest}
		/>
	);
};

A13LockRowsSwitchContainer.displayName = "A13LockRowsSwitchContainer";
