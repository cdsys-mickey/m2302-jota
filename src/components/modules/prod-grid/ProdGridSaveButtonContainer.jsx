import ResponsiveLoadingButton from "@/shared-components/responsive/ResponsiveLoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import { ProdGridContext } from "../../../contexts/prod-grid/ProdGridContext";
export const ProdGridSaveButtonContainer = () => {
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
			variant="contained"
			endIcon={<SaveIcon />}
			color="primary"
			loading={prodGrid.saveWorking}
			onClick={prodGrid.handleSave}>
			儲存
		</ResponsiveLoadingButton>
	);
};

ProdGridSaveButtonContainer.displayName = "ProdGridSaveButtonContainer";
