import { H03FormContainer } from "@/modules/H03/H03FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H03FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H03Toolbar /> */}
			{/* 表單 */}
			<H03FormContainer />
		</FrameBox>
	);
};

H03FrameContainer.displayName = "H03Frame";



