import { P02FormContainer } from "@/components/jobs/P02/P02FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P02FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P02Toolbar /> */}
			{/* 表單 */}
			<P02FormContainer />
		</FrameBox>
	);
};

P02FrameContainer.displayName = "P02Frame";

