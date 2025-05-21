import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";
import { B05DialogContainer } from "./dialog/B05DialogContainer";
import B05ListHeader from "./list/B05ListHeader";
import B05ListToolbar from "./list/B05ListToolbar";
import { B05ListViewContainer } from "./list/B05ListViewContainer";
import B05SearchFormContainer from "./search/B05SearchFormContainer";

export const B05FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner></FrameBanner>
				<B05SearchFormContainer />
				{/* 工具列 */}
				<B05ListToolbar />
				{/* 列表 */}
				<B05ListHeader />
				<B05ListViewContainer />
				{/* 對話框 */}
				<B05DialogContainer />

			</FrameBox>
		</FormProvider>
	);
};

B05FrameContainer.displayName = "B05FrameContainer";
