import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useContext } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";

export const ProdGridCancelEditButtonContainer = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);

	// if (
	// 	prodGrid.gridLoading ||
	// 	!prodGrid.gridData ||
	// 	prodGrid.gridData?.length === 0
	// ) {
	// 	return false;
	// }

	if (prodGrid.dirtyIds.size === 0) {
		return false;
	}
	return (
		<Button
			size="small"
			//
			endIcon={<CloseIcon />}
			color="primary"
			// onClick={prodGrid.unload}
			onClick={prodGrid.confirmCancelEdit}
			{...rest}>
			取消
		</Button>
	);
};

ProdGridCancelEditButtonContainer.displayName =
	"ProdGridCancelEditButtonContainer";
