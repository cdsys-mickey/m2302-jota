import { G10Context } from "@/pages/jobs/G10/G10Context";
import LockSwitch from "@/shared-components/LockSwitch";
import { TooltipWrapper } from "shared-components";
import { useContext, useMemo } from "react";

export const G10LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const g10 = useContext(G10Context);

	const tooltip = useMemo(() => {
		return g10.staging ? "電腦帳已形成，刪除後才能解除鎖定" : "";
	}, [g10.staging])

	const disabled = useMemo(() => {
		return g10.staging;
	}, [g10.staging])

	return (
		<TooltipWrapper title={tooltip} disabled={disabled} arrow>
			<LockSwitch
				unlockedLabel="編輯"
				locked={g10.grid.readOnly}
				onChange={g10.grid.toggleReadOnly}
				disabled={disabled}
				{...rest}
			/>
		</TooltipWrapper>
	);
};

G10LockSwitchContainer.displayName = "G10LockSwitchContainer";




