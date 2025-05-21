import { H38FormContainer } from "@/modules/H38/H38FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H38FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H38Toolbar /> */}
			{/* 表單 */}
			<H38FormContainer />
		</FrameBox>
	);
};

H38FrameContainer.displayName = "H38Frame";




