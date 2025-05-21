import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A16Toolbar from "@/modules/A16/A16Toolbar";
import { A16DialogContainer } from "@/modules/A16/dialog/A16DialogContainer";
import A16ListHeader from "@/modules/A16/list/A16ListHeader";
import { A16ListViewContainer } from "@/modules/A16/list/A16ListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";
import A16 from "./A16.mjs";

export const A16FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName="AppDept"
					paramsToJsonData={A16.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>
					</FrameBanner>
					{/* 工具列 */}
					<A16Toolbar />
					{/* 列表 */}
					<A16ListHeader />
					<A16ListViewContainer />
					{/* 對話框 */}
					<A16DialogContainer />
					<StdPrintDialogContainer />

				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

A16FrameContainer.displayName = "A16Frame";

