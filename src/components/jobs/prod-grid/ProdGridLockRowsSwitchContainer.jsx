import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import LockSwitch from "../../../shared-components/LockSwitch";

export const ProdGridLockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);
	const { canUpdate } = prodGrid;

	if (
		prodGrid.gridLoading ||
		!prodGrid.gridData ||
		prodGrid.gridData?.length === 0
	) {
		return false;
	}

	return (
		<LockSwitch
			unlockedLabel="編輯"
			locked={prodGrid.readOnly}
			onChange={prodGrid.toggleEditorLock}
			disabled={!canUpdate}
			{...rest}
		/>
	);
};

ProdGridLockRowsSwitchContainer.displayName = "ProdGridLockRowsSwitchContainer";
