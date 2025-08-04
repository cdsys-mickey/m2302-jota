import { P56FormContainer } from "@/modules/P56/P56FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P56FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P56Toolbar /> */}
			{/* 表單 */}
			<P56FormContainer />
		</FrameBox>
	);
};

P56FrameContainer.displayName = "P56Frame";








