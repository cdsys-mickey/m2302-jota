import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import ButtonWrapper from "@/shared-components/ButtonWrapper";
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
		<ButtonWrapper responsive onClick={prodGrid.toggleEditorLock} {...rest}>
			編輯
		</ButtonWrapper>
	);
};

ProdGridEditButtonContainer.displayName = "ProdGridEditButtonContainer";
