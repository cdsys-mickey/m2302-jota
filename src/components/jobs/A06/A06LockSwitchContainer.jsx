import { A06Context } from "@/contexts/A06/A06Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import useServiceStatus from "@/hooks/useServiceStatus";
import A06 from "@/modules/md-a06";
import AlertEx from "@/shared-components/AlertEx";
import LoadingTypography from "@/shared-components/LoadingTypography";
import LockSwitch from "@/shared-components/LockSwitch";
import TooltipWrapper from "@/shared-components/TooltipWrapper/TooltipWrapper";
import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";
import { Tooltip } from "@mui/material";
import { useMemo } from "react";
import { useContext } from "react";

export const A06LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a06 = useContext(A06Context);
	const { operator } = useContext(AuthContext);
	const serviceStatus = useServiceStatus({ name: "CustFile", jobId: "A06" });
	const { mobile } = useContext(ResponsiveContext);

	const disabled = useMemo(() => {
		return !a06.canManage || operator.CurFlagShip != 1;
	}, [a06.canManage, operator.CurFlagShip])


	const _title = useMemo(() => {
		let msg = "";
		if (operator.CurFlagShip != 1) {
			msg += "僅旗艦店可進行切換";
		}
		if (!a06.canManage) {
			msg += "切換需具備管理功能權限";
		}
		return msg;
	}, [a06.canManage, operator.CurFlagShip])

	if (a06.mode !== A06.Mode.CUSTOMER) {
		return false;
	}

	if (serviceStatus.loading !== false) {
		return <LoadingTypography />
	}

	if (serviceStatus.error) {
		return (
			<AlertEx error={serviceStatus.error} severity="error" dense>
				無法取得服務狀態
			</AlertEx>
		)
	}

	return (
		<TooltipWrapper title={_title}>
			<LockSwitch
				unlockedLabel={mobile ? "POS開放" : "POS下載開放"}
				lockedLabel={mobile ? "POS鎖定" : "POS下載鎖定"}
				locked={!serviceStatus.enabled}
				onChange={serviceStatus.toggle}
				disabled={disabled}
				width={mobile ? 90 : 130}
				{...rest}
			/>
		</TooltipWrapper>
	);
};

A06LockSwitchContainer.displayName = "A06LockSwitchContainer";
