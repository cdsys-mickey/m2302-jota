import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import P33Frame from "./P33Frame";

export const P33FrameContainer = () => {

	return (
		<StdPrintProvider tableName="CustTCod">
			<P33Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

P33FrameContainer.displayName = "P33Frame";




