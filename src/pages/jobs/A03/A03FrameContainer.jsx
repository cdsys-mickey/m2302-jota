import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A03Frame from "./A03Frame";

export const A03FrameContainer = () => {

	return (
		<StdPrintProvider tableName="ClassCod">
			<A03Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A03FrameContainer.displayName = "A03Frame";
