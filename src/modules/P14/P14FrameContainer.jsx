import { P14SearchFieldContainer } from "@/modules/P14/P14SearchFieldContainer";
import { P14DialogContainer } from "@/modules/P14/dialog/P14DialogContainer";
import P14ListHeader from "@/modules/P14/list/P14ListHeader";
import P14ListToolbar from "@/modules/P14/list/P14ListToolbar";
import { P14ListViewContainer } from "@/modules/P14/list/P14ListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";
export const P14FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{<P14SearchFieldContainer name="q" />}
				</FrameBanner>
				{/* 工具列 */}
				<P14ListToolbar />
				{/* 列表 */}
				<P14ListHeader />
				<P14ListViewContainer />
				{/* 對話框 */}
				<P14DialogContainer />

			</FrameBox>
		</FormProvider>
	);
};

P14FrameContainer.displayName = "P14FrameContainer";


