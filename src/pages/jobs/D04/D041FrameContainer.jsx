import { D041DialogContainer } from "@/components/jobs/D041/dialog/D041DialogContainer";
import { D041ExpDialogContainer } from "@/components/jobs/D041/exp-dialog/D041ExpDialogContainer";
import { D041ListHeaderContainer } from "@/components/jobs/D041/list/D041ListHeaderContainer";
import D041ListToolbar from "@/components/jobs/D041/list/D041ListToolbar";
import { D041ListViewContainer } from "@/components/jobs/D041/list/D041ListViewContainer";
import D041SearchFormContainer from "@/components/jobs/D041/search/D041SearchFormContainer";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";
import { FrameBanner, FrameBox } from "@/shared-components";

export const D041FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBanner>
					{/* <D041SearchFieldContainer name="q" /> */}
				</FrameBanner>
				<ResponsiveLayout>
					<D041SearchFormContainer initSize="md" />
					{/* 工具列 */}
					<D041ListToolbar />

					{/* 列表 */}
					<D041ListHeaderContainer />
					<D041ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<D041DialogContainer />
			<D041ExpDialogContainer />
		</FrameBox>
	);
};

D041FrameContainer.displayName = "D041FrameContainer";
