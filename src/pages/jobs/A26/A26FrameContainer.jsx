import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A26Frame from "./A26Frame";

export const A26FrameContainer = () => {

	return (
		<StdPrintProvider tableName="ComisnCod">
			<A26Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A26FrameContainer.displayName = "A26Frame";
