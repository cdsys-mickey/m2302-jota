import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A14Frame from "./A14Frame";

export const A14FrameContainer = () => {

	return (
		<StdPrintProvider tableName="ReasonCod">
			<A14Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A14FrameContainer.displayName = "A14Frame";
