import { P61FormContainer } from "@/modules/P61/P61FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P61FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P61Toolbar /> */}
			{/* 表單 */}
			<P61FormContainer />
		</FrameBox>
	);
};

P61FrameContainer.displayName = "P61Frame";








