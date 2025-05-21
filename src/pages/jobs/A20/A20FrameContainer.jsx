import A20Toolbar from "@/components/jobs/A20/A20Toolbar";
import { A20DialogContainer } from "@/components/jobs/A20/dialog/A20DialogContainer";
import A20ListHeader from "@/components/jobs/A20/list/A20ListHeader";
import { A20ListViewContainer } from "@/components/jobs/A20/list/A20ListViewContainer";
import { BomSearchFieldContainer } from "@/components/jobs/A20/search/BomSearchFieldContainer";
import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A20 from "@/modules/md-a20";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const A20FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName="BomFile_F"
					paramsToJsonData={A20.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>
						{<BomSearchFieldContainer name="qs" />}
					</FrameBanner>
					{/* 工具列 */}
					<A20Toolbar />
					{/* 列表 */}
					<A20ListHeader />
					<A20ListViewContainer />
					{/* 對話框 */}
					<A20DialogContainer />

					<StdPrintDialogContainer />
				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

A20FrameContainer.displayName = "A20Frame";
