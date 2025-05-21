import { H13FormContainer } from "@/modules/H13/H13FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H13FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H13Toolbar /> */}
			{/* 表單 */}
			<H13FormContainer />
		</FrameBox>
	);
};

H13FrameContainer.displayName = "H13Frame";






