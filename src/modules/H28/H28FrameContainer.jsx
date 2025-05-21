import { H28FormContainer } from "@/modules/H28/H28FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H28FrameContainer = () => {
	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H28Toolbar /> */}
			{/* 表單 */}
			<H28FormContainer />
		</FrameBox>
	);
};

H28FrameContainer.displayName = "H28Frame";



