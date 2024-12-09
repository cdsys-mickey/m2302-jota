import { A26Context } from "@/contexts/A26/A26Context";
import { AuthContext } from "@/contexts/auth/AuthContext";
import useServiceStatus from "@/hooks/useServiceStatus";
import AlertEx from "@/shared-components/AlertEx";
import LoadingTypography from "@/shared-components/LoadingTypography";
import LockSwitch from "@/shared-components/LockSwitch";
import { useMemo } from "react";
import { useContext } from "react";

export const A26LockSwitchContainer = (props) => {
	const { ...rest } = props;
	const a26 = useContext(A26Context);
	const { operator } = useContext(AuthContext);
	const serviceStatus = useServiceStatus({ name: "ComisnCod" });

	const disabled = useMemo(() => {
		return !a26.canUpdate || operator.CurHeadOffice != 1;
	}, [a26.canUpdate, operator])

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

A26LockSwitchContainer.displayName = "A26LockSwitchContainer";
