import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A16G from "@/modules/md-a16g";
import A16GFrame from "./A16GFrame";

export const A16GFrameContainer = () => {

	return (
		<StdPrintProvider
			tableName="AppDept"
			paramsToJsonData={A16G.paramsToJsonData}>
			<A16GFrame />
			{/* 對話框 */}
			<StdPrintDialogContainer />
		</StdPrintProvider>
	);
};

A16GFrameContainer.displayName = "A16GFrameContainer";
