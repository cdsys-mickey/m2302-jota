import { H24FormContainer } from "@/modules/H24/H24FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H24FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H24Toolbar /> */}
			{/* 表單 */}
			<H24FormContainer />
		</FrameBox>
	);
};

H24FrameContainer.displayName = "H24Frame";



