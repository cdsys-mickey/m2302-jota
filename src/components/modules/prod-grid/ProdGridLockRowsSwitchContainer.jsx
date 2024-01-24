import { useContext } from "react";
import SwitchEx from "@/shared-components/SwitchEx";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";

export const ProdGridLockRowsSwitchContainer = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);
	if (
		prodGrid.gridLoading ||
		!prodGrid.gridData ||
		prodGrid.gridData?.length === 0
	) {
		return false;
	}

	return (
		<SwitchEx
			label="編輯鎖定"
			checkedLabel="編輯鎖定"
			checked={prodGrid.readOnly}
			// onChange={prodGrid.toggleReadOnly}
			onChange={prodGrid.toggleEditorLock}
			{...rest}
		/>
	);
};

ProdGridLockRowsSwitchContainer.displayName = "ProdGridLockRowsSwitchContainer";
