import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A11Frame from "./A11Frame";

export const A11FrameContainer = () => {

	return (
		<StdPrintProvider tableName="BankCod">
			<A11Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A11FrameContainer.displayName = "A11Frame";
