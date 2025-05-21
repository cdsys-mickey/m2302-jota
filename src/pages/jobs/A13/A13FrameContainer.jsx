import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A13Frame from "./A13Frame";

export const A13FrameContainer = () => {

	return (
		<StdPrintProvider tableName="PDlineCod">
			<A13Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A13FrameContainer.displayName = "A13Frame";
