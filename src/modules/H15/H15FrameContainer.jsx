import { H15FormContainer } from "@/modules/H15/H15FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H15FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H15Toolbar /> */}
			{/* 表單 */}
			<H15FormContainer />
		</FrameBox>
	);
};

H15FrameContainer.displayName = "H15Frame";






