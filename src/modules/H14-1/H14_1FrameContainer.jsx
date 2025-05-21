import { H14_1FormContainer } from "@/modules/H14-1/H14_1FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H14_1FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H141Toolbar /> */}
			{/* 表單 */}
			<H14_1FormContainer />
		</FrameBox>
	);
};

H14_1FrameContainer.displayName = "H141Frame";






