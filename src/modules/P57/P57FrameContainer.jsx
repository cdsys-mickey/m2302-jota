import { P57FormContainer } from "@/modules/P57/P57FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P57FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P57Toolbar /> */}
			{/* 表單 */}
			<P57FormContainer />
		</FrameBox>
	);
};

P57FrameContainer.displayName = "P57Frame";








