import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A12Frame from "./A12Frame";

export const A12FrameContainer = () => {

	return (
		<StdPrintProvider tableName="RecvCod">
			<A12Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A12FrameContainer.displayName = "A12Frame";
