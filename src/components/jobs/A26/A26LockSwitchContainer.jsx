import { A26Context } from "@/contexts/A26/A26Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import useServiceStatus from "@/hooks/useServiceStatus";
import AlertEx from "@/shared-components/AlertEx";
import LoadingTypography from "@/shared-components/LoadingTypography";
import LockSwitch from "@/shared-components/LockSwitch";
import { Tooltip } from "@mui/material";
import { useMemo } from "react";
import { useContext } from "react";

export const A26LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a26 = useContext(A26Context);
	const { operator } = useContext(AuthContext);
	const serviceStatus = useServiceStatus({ name: "ComisnCod", jobId: "A26" });

	const disabled = useMemo(() => {
		return !a26.canManage || operator.CurHeadOffice != 1;
	}, [a26.canManage, operator.CurHeadOffice])

	const _title = useMemo(() => {
		let msg = "";
		if (operator.CurHeadOffice != 1) {
			msg += "僅物流倉可進行切換";
		}
		if (!a26.canManage) {
			msg += "切換需具備管理功能權限";
		}
		return msg;
	}, [a26.canManage, operator.CurHeadOffice])

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

A26LockSwitchContainer.displayName = "A26LockSwitchContainer";
