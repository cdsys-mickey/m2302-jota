import { P58FormContainer } from "@/modules/P58/P58FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P58FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P58Toolbar /> */}
			{/* 表單 */}
			<P58FormContainer />
		</FrameBox>
	);
};

P58FrameContainer.displayName = "P58Frame";








