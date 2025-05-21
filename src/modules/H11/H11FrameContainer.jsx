import { H11FormContainer } from "@/modules/H11/H11FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H11FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H11Toolbar /> */}
			{/* 表單 */}
			<H11FormContainer />
		</FrameBox>
	);
};

H11FrameContainer.displayName = "H11Frame";






