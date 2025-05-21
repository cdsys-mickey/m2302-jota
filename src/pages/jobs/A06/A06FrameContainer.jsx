import A06Toolbar from "@/components/jobs/A06/A06Toolbar";
import { A06DialogContainer } from "@/components/jobs/A06/dialog/A06DialogContainer";
import A06ListHeader from "@/components/jobs/A06/list/A06ListHeader";
import { A06ListViewContainer } from "@/components/jobs/A06/list/A06ListViewContainer";
import { A06SearchFieldContainer } from "@/components/jobs/A06/search/A06SearchFieldContainer";
import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { A06Context } from "@/contexts/A06/A06Context";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A06 from "@/modules/md-a06";
import { FrameBanner, FrameBox } from "@/shared-components";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const A06FrameContainer = () => {
	const a06 = useContext(A06Context);
	const { mode } = a06;
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				<StdPrintProvider
					tableName={
						mode === A06.Mode.NEW_CUSTOMER
							? "CustFileN"
							: "CustFile"
					}
					paramsToJsonData={A06.paramsToJsonData}>
					{/* 標題 */}
					<FrameBanner>
						{<A06SearchFieldContainer name="qs" />}
					</FrameBanner>
					{/* 工具列 */}
					<A06Toolbar />
					{/* 列表 */}
					<A06ListHeader />
					<A06ListViewContainer />
					{/* 對話框 */}
					<A06DialogContainer />
					<StdPrintDialogContainer />
				</StdPrintProvider>
			</FrameBox>
		</FormProvider>
	);
};

A06FrameContainer.displayName = "A06FrameContainer";
