import { H08FormContainer } from "@/modules/H08/H08FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H08FrameContainer = () => {
	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H08Toolbar /> */}
			{/* 表單 */}
			<H08FormContainer />
		</FrameBox>
	);
};

H08FrameContainer.displayName = "H08Frame";





