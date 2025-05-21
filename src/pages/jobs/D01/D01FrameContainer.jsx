import { D01DialogContainer } from "@/components/jobs/D01/dialog/D01DialogContainer";
import { D01ExpDialogContainer } from "@/components/jobs/D01/exp-dialog/D01ExpDialogContainer";
import { D01ListHeaderContainer } from "@/components/jobs/D01/list/D01ListHeaderContainer";
import D01ListToolbar from "@/components/jobs/D01/list/D01ListToolbar";
import { D01ListViewContainer } from "@/components/jobs/D01/list/D01ListViewContainer";
import D01SearchFormContainer from "@/components/jobs/D01/search/D01SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";

export const D01FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBanner>
					{/* <D01SearchFieldContainer name="q" /> */}
				</FrameBanner>
				<ResponsiveLayout initSize="md">
					<D01SearchFormContainer />
					{/* 工具列 */}
					<D01ListToolbar />

					{/* 列表 */}
					<D01ListHeaderContainer />
					<D01ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<D01DialogContainer />
			<D01ExpDialogContainer />

		</FrameBox>
	);
};

D01FrameContainer.displayName = "D01FrameContainer";
