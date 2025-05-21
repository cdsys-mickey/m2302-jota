import { H30FormContainer } from "@/modules/H30/H30FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H30FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H30Toolbar /> */}
			{/* 表單 */}
			<H30FormContainer />
		</FrameBox>
	);
};

H30FrameContainer.displayName = "H30Frame";



