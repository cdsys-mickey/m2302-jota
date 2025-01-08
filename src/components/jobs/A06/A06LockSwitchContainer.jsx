import { A06Context } from "@/contexts/A06/A06Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import useServiceStatus from "@/hooks/useServiceStatus";
import A06 from "@/modules/md-a06";
import AlertEx from "@/shared-components/AlertEx";
import LoadingTypography from "@/shared-components/LoadingTypography";
import LockSwitch from "@/shared-components/LockSwitch";
import { Tooltip } from "@mui/material";
import { useMemo } from "react";
import { useContext } from "react";

export const A06LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a06 = useContext(A06Context);
	const { operator } = useContext(AuthContext);
	const serviceStatus = useServiceStatus({ name: "CustFile" });

	const disabled = useMemo(() => {
		return !a06.canUpdate || operator.CurFlagShip != 1;
	}, [a06.canUpdate, operator])

	const _title = useMemo(() => {
		return disabled ? "僅旗艦店人員可進行切換" : ""
	}, [disabled])

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
		<Tooltip title={_title}>
			<span>
				<LockSwitch
					unlockedLabel="POS下載開放"
					lockedLabel="POS下載鎖定"
					locked={!serviceStatus.enabled}
					onChange={serviceStatus.toggle}
					disabled={disabled}
					width={130}
					{...rest}
				/>
			</span>
		</Tooltip>
	);
};

A06LockSwitchContainer.displayName = "A06LockSwitchContainer";
