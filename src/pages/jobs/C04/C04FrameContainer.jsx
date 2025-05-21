import { C04DialogContainer } from "@/components/jobs/C04/dialog/C04DialogContainer";
import C04ListToolbar from "@/components/jobs/C04/list/C04ListToolbar";
import { C04ListViewContainer } from "@/components/jobs/C04/list/C04ListViewContainer";
import C04SearchFormContainer from "@/components/jobs/C04/search/C04SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";
import { C04ExpDialogContainer } from "../../../components/jobs/C04/exp-dialog/C04ExpDialogContainer";
import { C04ListHeaderContainer } from "../../../components/jobs/C04/list/C04ListHeaderContainer";
export const C04FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBanner>
					{/* {<C04SearchFieldContainer name="q" />} */}
				</FrameBanner>
				<ResponsiveLayout initSize="md">
					<C04SearchFormContainer />
					{/* 工具列 */}
					<C04ListToolbar />

					{/* 列表 */}
					<C04ListHeaderContainer />
					<C04ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<C04DialogContainer />
			<C04ExpDialogContainer />

		</FrameBox>
	);
};

C04FrameContainer.displayName = "C04FrameContainer";
