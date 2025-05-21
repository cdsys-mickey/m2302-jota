import { B04DialogContainer } from "@/components/jobs/B04/dialog/B04DialogContainer";
import { B04ListFormContainer } from "@/components/jobs/B04/list/B04ListFormContainer";
import B04ListHeader from "@/components/jobs/B04/list/B04ListHeader";
import B04ListToolbar from "@/components/jobs/B04/list/B04ListToolbar";
import { B04ListViewContainer } from "@/components/jobs/B04/list/B04ListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const B04FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{/* {<B04SearchFieldContainer name="q" />} */}
				</FrameBanner>
				{/* 篩選工具列 */}
				<B04ListFormContainer />
				{/* 工具列 */}
				<B04ListToolbar />
				{/* 列表 */}
				<B04ListHeader />
				<B04ListViewContainer />
				{/* 對話框 */}
				<B04DialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

B04FrameContainer.displayName = "B04FrameContainer";



