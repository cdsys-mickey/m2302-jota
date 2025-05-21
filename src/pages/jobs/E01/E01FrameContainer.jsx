import { E01DialogContainer } from "@/components/jobs/E01/dialog/E01DialogContainer";
import { E01ListFormContainer } from "@/components/jobs/E01/list/E01ListFormContainer";
import E01ListHeader from "@/components/jobs/E01/list/E01ListHeader";
import E01ListToolbar from "@/components/jobs/E01/list/E01ListToolbar";
import { E01ListViewContainer } from "@/components/jobs/E01/list/E01ListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const E01FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {
		}
	});

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{/* {<E01SearchFieldContainer name="q" />} */}
				</FrameBanner>
				{/* 篩選工具列 */}
				<E01ListFormContainer />
				{/* 工具列 */}
				<E01ListToolbar />
				{/* 列表 */}
				<E01ListHeader />
				<E01ListViewContainer />
				{/* 對話框 */}
				<E01DialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

E01FrameContainer.displayName = "E01FrameContainer";


