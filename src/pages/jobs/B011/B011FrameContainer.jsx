import { B011DialogContainer } from "@/components/jobs/B011/dialog/B011DialogContainer";
import { B011ListFormContainer } from "@/components/jobs/B011/list/B011ListFormContainer";
import B011ListHeader from "@/components/jobs/B011/list/B011ListHeader";
import B011ListToolbar from "@/components/jobs/B011/list/B011ListToolbar";
import { B011ListViewContainer } from "@/components/jobs/B011/list/B011ListViewContainer";
import B011PrintDialogContainer from "@/components/jobs/B011/print/B011PrintDialogContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const B011FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{/* {<B011SearchFieldContainer name="q" />} */}
				</FrameBanner>
				{/* 篩選工具列 */}
				<B011ListFormContainer />
				{/* 工具列 */}
				<B011ListToolbar />
				{/* 列表 */}
				<B011ListHeader />
				<B011ListViewContainer />
				{/* 對話框 */}
				<B011DialogContainer />
				<B011PrintDialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

B011FrameContainer.displayName = "B011FrameContainer";

