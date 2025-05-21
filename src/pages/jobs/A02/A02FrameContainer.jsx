import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A02Frame from "./A02Frame";

export const A02FrameContainer = () => {

	return (
		<StdPrintProvider tableName="PackCod">
			<A02Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A02FrameContainer.displayName = "A02Frame";
