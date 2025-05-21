import { StdPrintDialogContainer } from "@/components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "@/contexts/std-print/StdPrintProvider";
import A01 from "@/modules/A01/A01.mjs";
import { A01Context } from "@/modules/A01/A01Context";
import A01Toolbar from "@/modules/A01/A01Toolbar";
import { A01DialogContainer } from "@/modules/A01/dialog/A01DialogContainer";
import A01ListHeader from "@/modules/A01/list/A01ListHeader";
import { A01ListViewContainer } from "@/modules/A01/list/A01ListViewContainer";
import { A01SearchFieldContainer } from "@/modules/A01/search/A01SearchFieldContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { useQuerySync } from "@/shared-hooks/useQuerySync";
import { useCallback, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const A01FrameContainer = () => {
	const searchForm = useForm();
	const a01 = useContext(A01Context);
	const { selectById } = a01;

	const handleQuerySync = useCallback(
		(newValue) => {
			if (newValue) {
				selectById(newValue);
			}
		},
		[selectById]
	);

	useQuerySync("target", handleQuerySync);

	return (
		<FrameBox>
			<StdPrintProvider
				tableName="StoreFile_F"
				paramsToJsonData={A01.paramsToJsonData(a01.mode)}>
				<FormProvider {...searchForm}>
					{/* 標題 */}
					<FrameBanner>
						{<A01SearchFieldContainer name="qs" />}
					</FrameBanner>
					{/* 工具列 */}
					<A01Toolbar />
					{/* 列表 */}
					<A01ListHeader />
					<A01ListViewContainer />
				</FormProvider>

				{/* 對話框 */}
				<A01DialogContainer />
				<StdPrintDialogContainer />

			</StdPrintProvider>
		</FrameBox>
	);
};

A01FrameContainer.displayName = "A01Frame";
