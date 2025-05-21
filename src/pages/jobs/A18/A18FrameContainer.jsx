import { A18FormContainer } from "@/components/jobs/A18/A18FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const A18FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <A18Toolbar /> */}
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<A18FormContainer />
		</FrameBox>
	);
};

A18FrameContainer.displayName = "A18Frame";
