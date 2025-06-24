import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import P31Frame from "./P31Frame";

export const P31FrameContainer = () => {

	return (
		<StdPrintProvider tableName="CtAreaCod">
			<P31Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

P31FrameContainer.displayName = "P31Frame";


