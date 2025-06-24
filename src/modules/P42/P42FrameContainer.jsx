import { P42DialogContainer } from "@/modules/P42/dialog/P42DialogContainer";
import P42ListHeader from "@/modules/P42/list/P42ListHeader";
import { P42ListViewContainer } from "@/modules/P42/list/P42ListViewContainer";
import { FormProvider, useForm } from "react-hook-form";


import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import { FrameBanner, FrameBox } from "@/shared-components";
import P42 from "./P42.mjs";
import P42Toolbar from "./P42Toolbar";
import { P42SearchFieldContainer } from "./search/P42SearchFieldContainer";


export const P42FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName="FactFile"
					paramsToJsonData={P42.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>
						{<P42SearchFieldContainer name="qs" />}
					</FrameBanner>
					{/* 工具列 */}
					<P42Toolbar />
					{/* 列表 */}
					<P42ListHeader />
					<P42ListViewContainer />
					{/* 對話框 */}
					<P42DialogContainer />
					<StdPrintDialogContainer />

				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

P42FrameContainer.displayName = "P42Frame";



