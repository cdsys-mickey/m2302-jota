import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A10Frame from "./A10Frame";

export const A10FrameContainer = () => {

	return (
		<StdPrintProvider tableName="TrafCod">
			<A10Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A10FrameContainer.displayName = "A10Frame";
