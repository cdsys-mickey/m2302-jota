import { H40FormContainer } from "@/modules/H40/H40FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H40FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H40Toolbar /> */}
			{/* 表單 */}
			<H40FormContainer />
		</FrameBox>
	);
};

H40FrameContainer.displayName = "H40Frame";




