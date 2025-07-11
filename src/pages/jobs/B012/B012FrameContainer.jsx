import { B012DialogContainer } from "@/components/jobs/B012/dialog/B012DialogContainer";
import { B012ListFormContainer } from "@/components/jobs/B012/list/B012ListFormContainer";
import B012ListHeader from "@/components/jobs/B012/list/B012ListHeader";
import B012ListToolbar from "@/components/jobs/B012/list/B012ListToolbar";
import { B012ListViewContainer } from "@/components/jobs/B012/list/B012ListViewContainer";
import B012PrintDialogContainer from "@/components/jobs/B012/print/B012PrintDialogContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const B012FrameContainer = () => {
	const searchForm = useForm();
	const form = useForm({
		defaultValues: {
			quotes: [],
		},
	});
	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{/* {<B012SearchFieldContainer name="q" />} */}
				</FrameBanner>
				{/* 篩選工具列 */}
				<B012ListFormContainer />
				{/* 工具列 */}
				<B012ListToolbar />
				{/* 列表 */}
				<B012ListHeader />
				<B012ListViewContainer />
				{/* 對話框 */}
				<FormProvider {...form}>
					<B012DialogContainer />
				</FormProvider>
				<B012PrintDialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

B012FrameContainer.displayName = "B012FrameContainer";

