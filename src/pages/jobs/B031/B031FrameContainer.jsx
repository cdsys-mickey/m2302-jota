import { B031DialogContainer } from "@/components/jobs/B031/dialog/B031DialogContainer";
import { B031ListFormContainer } from "@/components/jobs/B031/list/B031ListFormContainer";
import B031ListHeader from "@/components/jobs/B031/list/B031ListHeader";
import B031ListToolbar from "@/components/jobs/B031/list/B031ListToolbar";
import { B031ListViewContainer } from "@/components/jobs/B031/list/B031ListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const B031FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{/* {<B031SearchFieldContainer name="q" />} */}
				</FrameBanner>
				{/* 篩選工具列 */}
				<B031ListFormContainer />
				{/* 工具列 */}
				<B031ListToolbar />
				{/* 列表 */}
				<B031ListHeader />
				<B031ListViewContainer />
				{/* 對話框 */}
				<B031DialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

B031FrameContainer.displayName = "B031FrameContainer";


