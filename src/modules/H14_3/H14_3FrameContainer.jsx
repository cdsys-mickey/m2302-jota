import { H14_3FormContainer } from "@/modules/H14_3/H14_3FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H14_3FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H141Toolbar /> */}
			{/* 表單 */}
			<H14_3FormContainer />
		</FrameBox>
	);
};

H14_3FrameContainer.displayName = "H141Frame";







