import { P34DialogContainer } from "@/modules/P34/dialog/P34DialogContainer";
import P34ListHeader from "@/modules/P34/list/P34ListHeader";
import { P34ListViewContainer } from "@/modules/P34/list/P34ListViewContainer";
import { FormProvider, useForm } from "react-hook-form";


import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import { FrameBanner, FrameBox } from "@/shared-components";
import P34 from "./P34.mjs";
import P34Toolbar from "./P34Toolbar";
import { P34SearchFieldContainer } from "./search/P34SearchFieldContainer";


export const P34FrameContainer = () => {
	const searchForm = useForm();
	const form = useForm({
		defaultValues: {},
	});

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName="CarFile"
					paramsToJsonData={P34.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>
						{<P34SearchFieldContainer name="qs" />}
					</FrameBanner>
					{/* 工具列 */}
					<P34Toolbar />
					{/* 列表 */}
					<P34ListHeader />
					<P34ListViewContainer />
					{/* 對話框 */}
					<FormProvider {...form}>
						<P34DialogContainer />
					</FormProvider>
					<StdPrintDialogContainer />

				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

P34FrameContainer.displayName = "P34Frame";

