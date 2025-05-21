import { F07FormContainer } from "@/components/jobs/F07/F07FormContainer";
import F07Toolbar from "@/components/jobs/F07/F07Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";

export const F07FrameContainer = () => {
	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			<F07Toolbar />
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<F07FormContainer />
		</FrameBox>
	);
};

F07FrameContainer.displayName = "F07Frame";

