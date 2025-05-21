import { H51FormContainer } from "@/modules/H51/H51FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H51FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H51Toolbar /> */}
			{/* 表單 */}
			<H51FormContainer />
		</FrameBox>
	);
};

H51FrameContainer.displayName = "H51Frame";







