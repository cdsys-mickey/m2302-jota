import ResponsiveLoadingButton from "@/shared-components/button/ResponsiveLoadingButton";
import { useContext } from "react";
import { StdPrintContext } from "../../contexts/std-print/StdPrintContext";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
export const StdPrintRemoveAllFieldsButtonContainer = () => {
	const stdPrint = useContext(StdPrintContext);
	return (
		<ResponsiveLoadingButton
			variant="contained"
			color="neutral"
			endIcon={<KeyboardDoubleArrowLeftIcon />}
			onClick={stdPrint.handleRemoveAllFields}>
			移除所有欄位
		</ResponsiveLoadingButton>
	);
};

StdPrintRemoveAllFieldsButtonContainer.displayName =
	"StdPrintRemoveAllFieldsButtonContainer";
