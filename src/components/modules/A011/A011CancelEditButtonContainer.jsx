import { Button } from "@mui/material";
import { useContext } from "react";
import { A011Context } from "../../../contexts/A011/A011Context";
import CloseIcon from "@mui/icons-material/Close";

export const A011CancelEditButtonContainer = () => {
	const a011 = useContext(A011Context);

	if (a011.gridLoading || !a011.gridData || a011.gridData?.length === 0) {
		return false;
	}
	return (
		<Button
			size="small"
			// variant="contained"
			endIcon={<CloseIcon />}
			color="primary"
			loading={a011.saveWorking}
			onClick={a011.unload}>
			取消
		</Button>
	);
};

A011CancelEditButtonContainer.displayName = "A011CancelEditButtonContainer";
