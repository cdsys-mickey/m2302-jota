import { P21DialogContainer } from "@/modules/P21/dialog/P21DialogContainer";
import P21ListHeader from "@/modules/P21/list/P21ListHeader";
import { P21ListViewContainer } from "@/modules/P21/list/P21ListViewContainer";
import { FormProvider, useForm } from "react-hook-form";


import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import { FrameBanner, FrameBox } from "@/shared-components";
import P21 from "./P21.mjs";
import P21Toolbar from "./P21Toolbar";
import { P21SearchFieldContainer } from "./search/P21SearchFieldContainer";


export const P21FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName="FactFile"
					paramsToJsonData={P21.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>
						{<P21SearchFieldContainer name="qs" />}
					</FrameBanner>
					{/* 工具列 */}
					<P21Toolbar />
					{/* 列表 */}
					<P21ListHeader />
					<P21ListViewContainer />
					{/* 對話框 */}
					<P21DialogContainer />
					<StdPrintDialogContainer />

				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

P21FrameContainer.displayName = "P21Frame";


