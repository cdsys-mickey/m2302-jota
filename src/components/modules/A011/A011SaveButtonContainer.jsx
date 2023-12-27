import ResponsiveLoadingButton from "@/shared-components/responsive/ResponsiveLoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { useContext } from "react";
import { A011Context } from "../../../contexts/A011/A011Context";
export const A011SaveButtonContainer = () => {
	const a011 = useContext(A011Context);

	if (
		a011.gridLoading ||
		!a011.gridData ||
		a011.gridData?.length === 0 ||
		a011.lockRows
	) {
		return false;
	}
	return (
		<ResponsiveLoadingButton
			size="small"
			variant="contained"
			endIcon={<SaveIcon />}
			color="primary"
			loading={a011.saveWorking}
			onClick={a011.handleSave}>
			儲存
		</ResponsiveLoadingButton>
	);
};

A011SaveButtonContainer.displayName = "A011SaveButtonContainer";
