import { D06DialogContainer } from "@/components/jobs/D06/dialog/D06DialogContainer";
import { D06ExpDialogContainer } from "@/components/jobs/D06/exp-dialog/D06ExpDialogContainer";
import { D06ListHeaderContainer } from "@/components/jobs/D06/list/D06ListHeaderContainer";
import D06ListToolbar from "@/components/jobs/D06/list/D06ListToolbar";
import { D06ListViewContainer } from "@/components/jobs/D06/list/D06ListViewContainer";
import D06SearchFormContainer from "@/components/jobs/D06/search/D06SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";

export const D06FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBanner>
					{/* <D06SearchFieldContainer name="q" /> */}
				</FrameBanner>
				<ResponsiveLayout>
					<D06SearchFormContainer initSize="md" />
					{/* 工具列 */}
					<D06ListToolbar />

					{/* 列表 */}
					<D06ListHeaderContainer />
					<D06ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<D06DialogContainer />
			<D06ExpDialogContainer />
		</FrameBox>
	);
};

D06FrameContainer.displayName = "D06FrameContainer";
