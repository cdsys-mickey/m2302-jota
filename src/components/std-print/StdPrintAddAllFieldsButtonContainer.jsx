import { useContext } from "react";
import ResponsiveLoadingButton from "@/shared-components/button/ResponsiveLoadingButton";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export const StdPrintAddAllFieldsButtonContainer = () => {
	const stdPrint = useContext(StdPrintContext);
	return (
		<ResponsiveLoadingButton
			variant="contained"
			color="neutral"
			startIcon={<KeyboardDoubleArrowRightIcon />}
			onClick={stdPrint.handleAddAllFields}>
			加入所有欄位
		</ResponsiveLoadingButton>
	);
};

StdPrintAddAllFieldsButtonContainer.displayName =
	"StdPrintAddAllFieldsButtonContainer";
