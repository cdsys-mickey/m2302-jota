import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useContext } from "react";
import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";

export const ProdGridCancelEditButtonContainer = (props) => {
	const { children = "取消", ...rest } = props;
	const prodGrid = useContext(ProdGridContext);

	if (prodGrid.readOnly) {
		return false;
	}
	return (
		<Button
			size="small"
			//
			// endIcon={<CloseIcon />}
			color="primary"
			// onClick={prodGrid.unload}
			onClick={prodGrid.toggleEditorLock}
			{...rest}>
			{children}
		</Button>
	);
};

ProdGridCancelEditButtonContainer.displayName =
	"ProdGridCancelEditButtonContainer";
