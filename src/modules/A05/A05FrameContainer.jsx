import { A05DialogContainer } from "@/modules/A05/dialog/A05DialogContainer";
import A05ListHeader from "@/modules/A05/list/A05ListHeader";
import { A05ListViewContainer } from "@/modules/A05/list/A05ListViewContainer";
import { FormProvider, useForm } from "react-hook-form";


import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import { FrameBanner, FrameBox } from "@/shared-components";
import A05 from "./A05.mjs";
import A05Toolbar from "./A05Toolbar";
import { A05SearchFieldContainer } from "./search/A05SearchFieldContainer";


export const A05FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName="FactFile"
					paramsToJsonData={A05.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>
						{<A05SearchFieldContainer name="qs" />}
					</FrameBanner>
					{/* 工具列 */}
					<A05Toolbar />
					{/* 列表 */}
					<A05ListHeader />
					<A05ListViewContainer />
					{/* 對話框 */}
					<A05DialogContainer />
					<StdPrintDialogContainer />

				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

A05FrameContainer.displayName = "A05Frame";
