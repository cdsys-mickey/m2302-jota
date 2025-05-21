import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A09Frame from "./A09Frame";

export const A09FrameContainer = () => {

	return (
		<StdPrintProvider tableName="LineCod">
			<A09Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A09FrameContainer.displayName = "A09Frame";
