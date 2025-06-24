import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import P32Frame from "./P32Frame";

export const P32FrameContainer = () => {

	return (
		<StdPrintProvider tableName="CityCod">
			<P32Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

P32FrameContainer.displayName = "P32Frame";



