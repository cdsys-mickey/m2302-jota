import { F05FormContainer } from "@/components/jobs/F05/F05FormContainer";
import F05Toolbar from "@/components/jobs/F05/F05Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";

export const F05FrameContainer = () => {
	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			<F05Toolbar />
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<F05FormContainer />
		</FrameBox>
	);
};

F05FrameContainer.displayName = "F05Frame";

