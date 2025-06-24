import { P36DialogContainer } from "@/modules/P36/dialog/P36DialogContainer";
import P36ListHeader from "@/modules/P36/list/P36ListHeader";
import { P36ListViewContainer } from "@/modules/P36/list/P36ListViewContainer";
import { FormProvider, useForm } from "react-hook-form";


import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import { FrameBanner, FrameBox } from "@/shared-components";
import P36 from "./P36.mjs";
import P36Toolbar from "./P36Toolbar";
import { P36SearchFieldContainer } from "./search/P36SearchFieldContainer";


export const P36FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName="CndFile"
					paramsToJsonData={P36.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>
						{<P36SearchFieldContainer name="qs" />}
					</FrameBanner>
					{/* 工具列 */}
					<P36Toolbar />
					{/* 列表 */}
					<P36ListHeader />
					<P36ListViewContainer />
					{/* 對話框 */}
					<P36DialogContainer />
					<StdPrintDialogContainer />

				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

P36FrameContainer.displayName = "P36Frame";



