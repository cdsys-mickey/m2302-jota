import { useContext } from "react";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import { ButtonEx } from "@/shared-components";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const StdPrintResetButtonContainer = () => {
	const stdPrint = useContext(StdPrintContext);

	return (
		<ButtonEx
			responsive
			variant="contained"
			color="warning"
			startIcon={<RestartAltIcon />}
			onClick={stdPrint.handleReset}>
			重設
		</ButtonEx>
	);
};

StdPrintResetButtonContainer.displayName = "StdPrintResetButtonContainer";
