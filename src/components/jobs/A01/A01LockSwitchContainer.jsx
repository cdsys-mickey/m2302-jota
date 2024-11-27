import { A01Context } from "@/contexts/A01/A01Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import useServiceStatus from "@/hooks/useServiceStatus";
import AlertEx from "@/shared-components/AlertEx";
import LoadingTypography from "@/shared-components/LoadingTypography";
import LockSwitch from "@/shared-components/LockSwitch";
import { useMemo } from "react";
import { useContext } from "react";

export const A01LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a01 = useContext(A01Context);
	const { operator } = useContext(AuthContext);
	const serviceStatus = useServiceStatus({ name: "StoreFile_F" });

	const disabled = useMemo(() => {
		return !a01.canUpdate || operator.CurHeadOffice != 1;
	}, [a01.canUpdate, operator])

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
			// locked={a01.readOnly}
			// onChange={a01.toggleReadOnly}
			locked={!serviceStatus.enabled}
			onChange={serviceStatus.toggle}
			disabled={disabled}
			width={130}
			{...rest}
		/>
	);
};

A01LockSwitchContainer.displayName = "A01LockSwitchContainer";
