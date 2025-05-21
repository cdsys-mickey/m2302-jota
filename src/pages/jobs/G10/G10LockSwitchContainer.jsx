import { G10Context } from "@/pages/jobs/G10/G10Context";
import LockSwitch from "@/shared-components/LockSwitch";
import { Tooltip } from "@mui/material";
import { useMemo } from "react";
import { useContext } from "react";

export const G10LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const g10 = useContext(G10Context);

	const tooltip = useMemo(() => {
		return g10.staging ? "電腦帳已形成，刪除後才能解除鎖定" : "";
	}, [g10.staging])

	// if (!g10.canUpdate) {
	// 	return false;
	// }

	return (
		<Tooltip title={tooltip} arrow>
			<span>
				<LockSwitch
					unlockedLabel="編輯"
					locked={g10.grid.readOnly}
					onChange={g10.grid.toggleReadOnly}
					disabled={g10.staging}
					{...rest}
				/>
			</span>
		</Tooltip>
	);
};

G10LockSwitchContainer.displayName = "G10LockSwitchContainer";




