import { P41DialogContainer } from "@/modules/P41/dialog/P41DialogContainer";
import P41ListHeader from "@/modules/P41/list/P41ListHeader";
import { P41ListViewContainer } from "@/modules/P41/list/P41ListViewContainer";
import { FormProvider, useForm } from "react-hook-form";


import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import { FrameBanner, FrameBox } from "@/shared-components";
import P41 from "./P41.mjs";
import P41Toolbar from "./P41Toolbar";
import { P41SearchFieldContainer } from "./search/P41SearchFieldContainer";


export const P41FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName="FactFile"
					paramsToJsonData={P41.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>
						{<P41SearchFieldContainer name="qs" />}
					</FrameBanner>
					{/* 工具列 */}
					<P41Toolbar />
					{/* 列表 */}
					<P41ListHeader />
					<P41ListViewContainer />
					{/* 對話框 */}
					<P41DialogContainer />
					<StdPrintDialogContainer />

				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

P41FrameContainer.displayName = "P41Frame";



