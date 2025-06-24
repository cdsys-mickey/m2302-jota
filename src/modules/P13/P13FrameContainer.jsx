import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import P13Frame from "./P13Frame";

export const P13FrameContainer = () => {

	return (
		<StdPrintProvider tableName="HotelCod">
			<P13Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

P13FrameContainer.displayName = "P13Frame";

