import { P54FormContainer } from "@/modules/P54/P54FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P54FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P54Toolbar /> */}
			{/* 表單 */}
			<P54FormContainer />
		</FrameBox>
	);
};

P54FrameContainer.displayName = "P54Frame";








