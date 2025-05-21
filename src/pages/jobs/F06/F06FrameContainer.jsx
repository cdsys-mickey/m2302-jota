import { F06FormContainer } from "@/components/jobs/F06/F06FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const F06FrameContainer = () => {
	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <F06Toolbar /> */}
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<F06FormContainer />
		</FrameBox>
	);
};

F06FrameContainer.displayName = "F06Frame";

