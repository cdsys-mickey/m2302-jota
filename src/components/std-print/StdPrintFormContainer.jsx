import { StdPrintContext } from "@/contexts/std-print/StdPrintContext";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import StdPrintForm from "./StdPrintForm";

export const StdPrintFormContainer = () => {
	const stdPrint = useContext(StdPrintContext);
	const { height } = useWindowSize();

	return (
		<StdPrintForm
			height={height - 190}
			onDragEnd={stdPrint.handleDragEnd}
		/>
	);
};

StdPrintFormContainer.displayName = "StdPrintFormContainer";
