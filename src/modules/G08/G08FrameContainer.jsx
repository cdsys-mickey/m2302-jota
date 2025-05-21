import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import G08Toolbar from "@/modules/G08/G08Toolbar";
import { G08DialogContainer } from "@/modules/G08/dialog/G08DialogContainer";
import G08ListHeader from "@/modules/G08/list/G08ListHeader";
import { G08ListViewContainer } from "@/modules/G08/list/G08ListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";
import G08 from "./G08.mjs";
import { G08ListFormContainer } from "./list/G08ListFormContainer";

export const G08FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName="AppDept"
					paramsToJsonData={G08.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>

					</FrameBanner>
					{/* 篩選表單 */}
					<G08ListFormContainer />
					{/* 工具列 */}
					<G08Toolbar />
					{/* 列表 */}
					<G08ListHeader />
					<G08ListViewContainer />
					{/* 對話框 */}
					<G08DialogContainer />
					<StdPrintDialogContainer />

				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

G08FrameContainer.displayName = "G08Frame";


