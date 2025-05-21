import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A04Frame from "./A04Frame";

export const A04FrameContainer = () => {

	return (
		<StdPrintProvider tableName="CaseCod">
			<A04Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A04FrameContainer.displayName = "A04Frame";
