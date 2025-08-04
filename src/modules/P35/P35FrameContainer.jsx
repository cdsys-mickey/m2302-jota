import { P35DialogContainer } from "@/modules/P35/dialog/P35DialogContainer";
import P35ListHeader from "@/modules/P35/list/P35ListHeader";
import { P35ListViewContainer } from "@/modules/P35/list/P35ListViewContainer";
import { FormProvider, useForm } from "react-hook-form";


import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import { FrameBanner, FrameBox } from "@/shared-components";
import P35 from "./P35.mjs";
import P35Toolbar from "./P35Toolbar";
import { P35SearchFieldContainer } from "./search/P35SearchFieldContainer";


export const P35FrameContainer = () => {
	const searchForm = useForm();
	const form = useForm({
		defaultValues: {},
	});

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName="TrvFile_F"
					paramsToJsonData={P35.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>
						{<P35SearchFieldContainer name="qs" />}
					</FrameBanner>
					{/* 工具列 */}
					<P35Toolbar />
					{/* 列表 */}
					<P35ListHeader />
					<P35ListViewContainer />
					{/* 對話框 */}
					<FormProvider {...form}>
						<P35DialogContainer />
						<StdPrintDialogContainer />
					</FormProvider>

				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

P35FrameContainer.displayName = "P35Frame";


