import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { ButtonEx } from "@/shared-components";
import { useContext } from "react";

export const ProdGridEditButtonContainer = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);

	if (
		prodGrid.gridLoading ||
		!prodGrid.gridData ||
		prodGrid.gridData?.length === 0 ||
		!prodGrid.readOnly
	) {
		return false;
	}

	return (
		<ButtonEx responsive onClick={prodGrid.toggleEditorLock} {...rest}>
			編輯
		</ButtonEx>
	);
};

ProdGridEditButtonContainer.displayName = "ProdGridEditButtonContainer";
