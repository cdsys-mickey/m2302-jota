import { G06DialogContainer } from "@/modules/G06/dialog/G06DialogContainer";
import G06ListHeader from "@/modules/G06/list/G06ListHeader";
import { G06ListViewContainer } from "@/modules/G06/list/G06ListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";
import G06Toolbar from "./G06Toolbar";
import { G06ListFormContainer } from "./list/G06ListFormContainer";

export const G06FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner></FrameBanner>
				<G06ListFormContainer />
				{/* 工具列 */}
				<G06Toolbar />
				{/* 列表 */}
				<G06ListHeader />
				<G06ListViewContainer />
				{/* 對話框 */}
				<G06DialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

G06FrameContainer.displayName = "G06Frame";

