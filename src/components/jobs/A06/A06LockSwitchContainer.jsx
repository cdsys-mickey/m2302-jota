import { A06Context } from "@/contexts/A06/A06Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import useServiceStatus from "@/hooks/useServiceStatus";
import A06 from "@/modules/md-a06";
import AlertEx from "@/shared-components/AlertEx";
import LoadingTypography from "@/shared-components/LoadingTypography";
import LockSwitch from "@/shared-components/LockSwitch";
import { useMemo } from "react";
import { useContext } from "react";

export const A06LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a06 = useContext(A06Context);
	const { operator } = useContext(AuthContext);
	const serviceStatus = useServiceStatus({ name: "CustFile" });

	const disabled = useMemo(() => {
		return !a06.canUpdate || operator.CurHeadOffice != 1;
	}, [a06.canUpdate, operator])

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
		<LockSwitch
			unlockedLabel="POS下載開放"
			lockedLabel="POS下載鎖定"
			locked={!serviceStatus.enabled}
			onChange={serviceStatus.toggle}
			disabled={disabled}
			width={130}
			{...rest}
		/>
	);
};

A06LockSwitchContainer.displayName = "A06LockSwitchContainer";
