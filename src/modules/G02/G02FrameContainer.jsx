import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";
import G02BottomToolbar from "./G02BottomToolbar";
import G02ListHeader from "./list/G02ListHeader";
import G02ListToolbar from "./list/G02ListToolbar";
import { G02ListViewContainer } from "./list/G02ListViewContainer";
import G02SearchFormContainer from "./search/G02SearchFormContainer";

export const G02FrameContainer = () => {
	const form = useForm();

	return (
		<FormProvider {...form}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>

				</FrameBanner>
				<G02SearchFormContainer />
				{/* 工具列 */}
				<G02ListToolbar />
				{/* 列表 */}
				<G02ListHeader />
				<G02ListViewContainer />
				{/* 沖銷總額 */}
				<G02BottomToolbar />
			</FrameBox>
		</FormProvider>
	);
};

G02FrameContainer.displayName = "G02FrameContainer";

