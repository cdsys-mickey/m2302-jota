import { D02DialogContainer } from "@/components/jobs/D02/dialog/D02DialogContainer";
import { D02ExpDialogContainer } from "@/components/jobs/D02/exp-dialog/D02ExpDialogContainer";
import { D02ListHeaderContainer } from "@/components/jobs/D02/list/D02ListHeaderContainer";
import D02ListToolbar from "@/components/jobs/D02/list/D02ListToolbar";
import { D02ListViewContainer } from "@/components/jobs/D02/list/D02ListViewContainer";
import D02SearchFormContainer from "@/components/jobs/D02/search/D02SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";

export const D02FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBanner>
					{/* <D02SearchFieldContainer name="q" /> */}
				</FrameBanner>

				<ResponsiveLayout>
					<D02SearchFormContainer />
					{/* 工具列 */}
					<D02ListToolbar />

					{/* 列表 */}
					<D02ListHeaderContainer />
					<D02ListViewContainer />

				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<D02DialogContainer />
			<D02ExpDialogContainer />
		</FrameBox>
	);
};

D02FrameContainer.displayName = "D02FrameContainer";
