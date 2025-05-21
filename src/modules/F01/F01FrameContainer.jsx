import { F01SearchFieldContainer } from "@/modules/F01/F01SearchFieldContainer";
import { F01DialogContainer } from "@/modules/F01/dialog/F01DialogContainer";
import F01ListHeader from "@/modules/F01/list/F01ListHeader";
import F01ListToolbar from "@/modules/F01/list/F01ListToolbar";
import { F01ListViewContainer } from "@/modules/F01/list/F01ListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";
export const F01FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{<F01SearchFieldContainer name="q" />}
				</FrameBanner>
				{/* 工具列 */}
				<F01ListToolbar />
				{/* 列表 */}
				<F01ListHeader />
				<F01ListViewContainer />
				{/* 對話框 */}
				<F01DialogContainer />

			</FrameBox>
		</FormProvider>
	);
};

F01FrameContainer.displayName = "F01FrameContainer";

