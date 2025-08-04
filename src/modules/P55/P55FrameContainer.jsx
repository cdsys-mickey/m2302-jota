import { P55FormContainer } from "@/modules/P55/P55FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P55FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P55Toolbar /> */}
			{/* 表單 */}
			<P55FormContainer />
		</FrameBox>
	);
};

P55FrameContainer.displayName = "P55Frame";








