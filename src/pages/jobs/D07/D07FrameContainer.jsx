import { D07DialogContainer } from "@/components/jobs/D07/dialog/D07DialogContainer";
import { D07ExpDialogContainer } from "@/components/jobs/D07/exp-dialog/D07ExpDialogContainer";
import { D07ListHeaderContainer } from "@/components/jobs/D07/list/D07ListHeaderContainer";
import D07ListToolbar from "@/components/jobs/D07/list/D07ListToolbar";
import { D07ListViewContainer } from "@/components/jobs/D07/list/D07ListViewContainer";
import D07SearchFormContainer from "@/components/jobs/D07/search/D07SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";

export const D07FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBanner>
					{/* <D07SearchFieldContainer name="q" /> */}
				</FrameBanner>
				<ResponsiveLayout>
					<D07SearchFormContainer />
					{/* 工具列 */}
					<D07ListToolbar />

					{/* 列表 */}
					<D07ListHeaderContainer />
					<D07ListViewContainer />

				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<D07DialogContainer />
			<D07ExpDialogContainer />
		</FrameBox>
	);
};

D07FrameContainer.displayName = "D07FrameContainer";
