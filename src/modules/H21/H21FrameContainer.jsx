import { H21FormContainer } from "@/modules/H21/H21FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H21FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H21Toolbar /> */}
			{/* 表單 */}
			<H21FormContainer />
		</FrameBox>
	);
};

H21FrameContainer.displayName = "H21Frame";




