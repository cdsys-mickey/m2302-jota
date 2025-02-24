import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import useServiceStatus from "@/hooks/useServiceStatus";
import A01 from "@/modules/md-a01";
import AlertEx from "@/shared-components/AlertEx";
import LoadingTypography from "@/shared-components/LoadingTypography";
import LockSwitch from "@/shared-components/LockSwitch";
import { ResponsiveContext } from "@/shared-contexts/responsive/ResponsiveContext";
import { Tooltip } from "@mui/material";
import { useMemo } from "react";
import { useContext } from "react";

export const A01LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a01 = useContext(A01Context);
	const { operator } = useContext(AuthContext);
	const serviceStatus = useServiceStatus({ name: "StoreFile_F", jobId: "A01" });
	const { mobile } = useContext(ResponsiveContext);

	const disabled = useMemo(() => {
		return !a01.canManage || operator.CurHeadOffice != 1;
	}, [a01.canManage, operator])

	const _title = useMemo(() => {
		let msg = "";
		if (operator.CurHeadOffice != 1) {
			msg += "僅物流倉可進行切換";
		}
		if (!a01.canManage) {
			msg += "切換需具備管理功能權限";
		}
		return msg;
	}, [a01.canManage, operator.CurHeadOffice])

	if (a01.mode !== A01.Mode.PROD) {
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
					unlockedLabel={mobile ? "POS開放" : "POS下載開放"}
					lockedLabel={mobile ? "POS鎖定" : "POS下載鎖定"}
					locked={!serviceStatus.enabled}
					onChange={serviceStatus.toggle}
					disabled={disabled}
					width={mobile ? 90 : 130}
					// disableBoxShadow
					// disableShadow
					{...rest}
				/>

			</span>
		</Tooltip>
	);
};

A01LockSwitchContainer.displayName = "A01LockSwitchContainer";
