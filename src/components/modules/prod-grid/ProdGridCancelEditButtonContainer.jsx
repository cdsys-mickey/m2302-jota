import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useContext } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";

export const ProdGridCancelEditButtonContainer = () => {
	const prodGrid = useContext(ProdGridContext);

	if (
		prodGrid.gridLoading ||
		!prodGrid.gridData ||
		prodGrid.gridData?.length === 0
	) {
		return false;
	}
	return (
		<Button
			size="small"
			// variant="contained"
			endIcon={<CloseIcon />}
			color="primary"
			loading={prodGrid.saveWorking}
			onClick={prodGrid.unload}>
			取消
		</Button>
	);
};

ProdGridCancelEditButtonContainer.displayName =
	"ProdGridCancelEditButtonContainer";
