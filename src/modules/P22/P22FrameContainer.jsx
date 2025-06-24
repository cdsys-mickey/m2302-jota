import { P22FormContainer } from "@/modules/P22/P22FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P22FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P22Toolbar /> */}
			{/* 表單 */}
			<P22FormContainer />
		</FrameBox>
	);
};

P22FrameContainer.displayName = "P22Frame";




