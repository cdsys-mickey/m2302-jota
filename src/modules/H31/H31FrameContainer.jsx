import { H31FormContainer } from "@/modules/H31/H31FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H31FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H31Toolbar /> */}
			{/* 表單 */}
			<H31FormContainer />
		</FrameBox>
	);
};

H31FrameContainer.displayName = "H31Frame";




