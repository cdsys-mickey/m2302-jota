import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useContext } from "react";
import { A22Context } from "@/contexts/A22/A22Context";

export const A22GridCancelEditButtonContainer = () => {
	const prodGrid = useContext(A22Context);

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
			variant="outlined"
			endIcon={<CloseIcon />}
			color="primary"
			onClick={prodGrid.unload}>
			取消
		</Button>
	);
};

A22GridCancelEditButtonContainer.displayName =
	"A22GridCancelEditButtonContainer";
