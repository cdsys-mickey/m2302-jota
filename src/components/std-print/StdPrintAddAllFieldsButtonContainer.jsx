import { useContext } from "react";
import { ButtonEx } from "@/shared-components";
import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export const StdPrintAddAllFieldsButtonContainer = () => {
	const stdPrint = useContext(StdPrintContext);
	return (
		<ButtonEx
			responsive
			variant="contained"
			color="neutral"
			startIcon={<KeyboardDoubleArrowRightIcon />}
			onClick={stdPrint.handleAddAllFields}>
			加入所有欄位
		</ButtonEx>
	);
};

StdPrintAddAllFieldsButtonContainer.displayName =
	"StdPrintAddAllFieldsButtonContainer";
