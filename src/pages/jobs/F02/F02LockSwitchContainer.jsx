import { F02Context } from "@/pages/jobs/F02/F02Context";
import LockSwitch from "@/shared-components/LockSwitch";
import { TooltipWrapper } from "shared-components";
import { useContext, useMemo } from "react";

export const F02LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const f02 = useContext(F02Context);

	const tooltip = useMemo(() => {
		return f02.staging ? "電腦帳已形成，刪除後才能解除鎖定" : "";
	}, [f02.staging])

	const disabled = useMemo(() => {
		return f02.staging
	}, [f02.staging])

	return (
		<TooltipWrapper title={tooltip} disabled={disabled} arrow>
			<LockSwitch
				unlockedLabel="編輯"
				locked={f02.grid.readOnly}
				onChange={f02.grid.toggleReadOnly}
				disabled={disabled}
				{...rest}
			/>
		</TooltipWrapper>
	);
};

F02LockSwitchContainer.displayName = "F02LockSwitchContainer";


