import { P03FormContainer } from "@/modules/P03/P03FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P03FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P03Toolbar /> */}
			{/* 表單 */}
			<P03FormContainer />
		</FrameBox>
	);
};

P03FrameContainer.displayName = "P03Frame";







