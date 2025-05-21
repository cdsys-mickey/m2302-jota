import { F02Context } from "@/pages/jobs/F02/F02Context";
import LockSwitch from "@/shared-components/LockSwitch";
import { Tooltip } from "@mui/material";
import { useMemo } from "react";
import { useContext } from "react";

export const F02LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const f02 = useContext(F02Context);

	const tooltip = useMemo(() => {
		return f02.staging ? "電腦帳已形成，刪除後才能解除鎖定" : "";
	}, [f02.staging])

	// if (!f02.canUpdate) {
	// 	return false;
	// }

	return (
		<Tooltip title={tooltip} arrow>
			<span>
				<LockSwitch
					unlockedLabel="編輯"
					locked={f02.grid.readOnly}
					onChange={f02.grid.toggleReadOnly}
					disabled={f02.staging}
					{...rest}
				/>
			</span>
		</Tooltip>
	);
};

F02LockSwitchContainer.displayName = "F02LockSwitchContainer";


