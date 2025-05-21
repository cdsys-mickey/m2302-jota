import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A15Frame from "./A15Frame";

export const A15FrameContainer = () => {

	return (
		<StdPrintProvider tableName="EmplCod">
			<A15Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A15FrameContainer.displayName = "A15Frame";
