import { H06FormContainer } from "@/modules/H06/H06FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H06FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H06Toolbar /> */}
			{/* 表單 */}
			<H06FormContainer />
		</FrameBox>
	);
};

H06FrameContainer.displayName = "H06Frame";







