import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useContext } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import RecyclingIcon from "@mui/icons-material/Recycling";

export const ProdGridCancelChangesButtonContainer = (props) => {
	const { ...rest } = props;
	const prodGrid = useContext(ProdGridContext);

	if (prodGrid.dirtyIds.size === 0) {
		return false;
	}
	return (
		<Button
			size="small"
			//
			endIcon={<RecyclingIcon />}
			color="primary"
			// onClick={prodGrid.unload}
			onClick={prodGrid.confirmCancelChanges}
			{...rest}>
			回復變更
		</Button>
	);
};

ProdGridCancelChangesButtonContainer.displayName =
	"ProdGridCancelChangesButtonContainer";
