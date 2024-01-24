import { useContext } from "react";
import { StdPrintContext } from "../../contexts/std-print/StdPrintContext";
import ResponsiveLoadingButton from "../../shared-components/responsive/ResponsiveLoadingButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const StdPrintResetButtonContainer = () => {
	const stdPrint = useContext(StdPrintContext);

	return (
		<ResponsiveLoadingButton
			variant="contained"
			color="warning"
			startIcon={<RestartAltIcon />}
			onClick={stdPrint.handleReset}>
			重設
		</ResponsiveLoadingButton>
	);
};

StdPrintResetButtonContainer.displayName = "StdPrintResetButtonContainer";
