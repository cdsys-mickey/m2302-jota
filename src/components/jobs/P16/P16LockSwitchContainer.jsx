import { P16Context } from "@/contexts/P16/P16Context";
import { useContext } from "react";
import LockSwitch from "@/shared-components/LockSwitch";

export const P16LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const p16 = useContext(P16Context);
	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={p16.grid.readOnly}
			onChange={p16.grid.toggleReadOnly}
			disabled={!p16.canUpdate}
			{...rest}
		/>
	);
};

P16LockSwitchContainer.displayName = "P16LockSwitchContainer";

