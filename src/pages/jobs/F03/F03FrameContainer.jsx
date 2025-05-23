import { F03DialogContainer } from "@/components/jobs/F03/dialog/F03DialogContainer";
import { F03ExpDialogContainer } from "@/components/jobs/F03/exp-dialog/F03ExpDialogContainer";
import { F03ListHeaderContainer } from "@/components/jobs/F03/list/F03ListHeaderContainer";
import F03ListToolbar from "@/components/jobs/F03/list/F03ListToolbar";
import { F03ListViewContainer } from "@/components/jobs/F03/list/F03ListViewContainer";
import { F03SearchFieldContainer } from "@/components/jobs/F03/search/F03SearchFieldContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const F03FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBanner>
					<F03SearchFieldContainer name="q" />
				</FrameBanner>
				{/* 工具列 */}
				<F03ListToolbar />

				{/* 列表 */}
				<F03ListHeaderContainer />
				<F03ListViewContainer />
			</FormProvider>

			{/* 對話框 */}
			<F03DialogContainer />
			<F03ExpDialogContainer />
		</FrameBox>
	);
};

F03FrameContainer.displayName = "F03FrameContainer";

