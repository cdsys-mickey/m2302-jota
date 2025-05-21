import { H46FormContainer } from "@/modules/H46/H46FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H46FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H46Toolbar /> */}
			{/* 表單 */}
			<H46FormContainer />
		</FrameBox>
	);
};

H46FrameContainer.displayName = "H46Frame";





