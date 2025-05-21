import { P04FormContainer } from "@/components/jobs/P04/P04FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P04FrameContainer = () => {
	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P04Toolbar /> */}
			{/* 表單 */}
			<P04FormContainer />
		</FrameBox>
	);
};

P04FrameContainer.displayName = "P04Frame";


