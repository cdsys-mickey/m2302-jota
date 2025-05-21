import { H39FormContainer } from "@/modules/H39/H39FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H39FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H39Toolbar /> */}
			{/* 表單 */}
			<H39FormContainer />
		</FrameBox>
	);
};

H39FrameContainer.displayName = "H39Frame";





