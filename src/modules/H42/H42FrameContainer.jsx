import { H42FormContainer } from "@/modules/H42/H42FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H42FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H42Toolbar /> */}
			{/* 表單 */}
			<H42FormContainer />
		</FrameBox>
	);
};

H42FrameContainer.displayName = "H42Frame";







