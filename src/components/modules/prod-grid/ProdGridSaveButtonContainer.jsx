import ResponsiveLoadingButton from "@/shared-components/button/ResponsiveLoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import { ProdGridContext } from "../../../contexts/prod-grid/ProdGridContext";
export const ProdGridSaveButtonContainer = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);

	if (
		prodGrid.gridLoading ||
		!prodGrid.gridData ||
		prodGrid.gridData?.length === 0 ||
		prodGrid.readOnly
	) {
		return false;
	}
	return (
		<ResponsiveLoadingButton
			size="small"
			disabled={prodGrid.dirtyIds.size === 0}
			endIcon={<SaveIcon />}
			loading={prodGrid.saveWorking}
			onClick={prodGrid.handleSave}
			{...rest}>
			儲存
		</ResponsiveLoadingButton>
	);
};

ProdGridSaveButtonContainer.displayName = "ProdGridSaveButtonContainer";
