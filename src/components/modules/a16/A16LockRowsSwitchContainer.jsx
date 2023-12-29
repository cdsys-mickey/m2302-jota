import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { A16Context } from "@/contexts/A16/A16Context";

export const A16LockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const a16 = useContext(A16Context);
	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={a16.readOnly}
			onChange={a16.toggleReadOnly}
			{...rest}
		/>
	);
};

A16LockRowsSwitchContainer.displayName = "A16LockRowsSwitchContainer";
