import { StdPrintDialogContainer } from "../../../components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "../../../contexts/std-print/StdPrintProvider";
import A08Frame from "./A08Frame";

export const A08FrameContainer = () => {

	return (
		<StdPrintProvider tableName="AreaCod">
			<A08Frame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A08FrameContainer.displayName = "A08Frame";
