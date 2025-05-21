import { B032DialogContainer } from "@/components/jobs/B032/dialog/B032DialogContainer";
import { B032ListFormContainer } from "@/components/jobs/B032/list/B032ListFormContainer";
import B032ListHeader from "@/components/jobs/B032/list/B032ListHeader";
import B032ListToolbar from "@/components/jobs/B032/list/B032ListToolbar";
import { B032ListViewContainer } from "@/components/jobs/B032/list/B032ListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const B032FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{/* {<B032SearchFieldContainer name="q" />} */}
				</FrameBanner>
				{/* 篩選工具列 */}
				<B032ListFormContainer />
				{/* 工具列 */}
				<B032ListToolbar />
				{/* 列表 */}
				<B032ListHeader />
				<B032ListViewContainer />
				{/* 對話框 */}
				<B032DialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

B032FrameContainer.displayName = "B032FrameContainer";


