import { H41FormContainer } from "@/modules/H41/H41FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H41FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H41Toolbar /> */}
			{/* 表單 */}
			<H41FormContainer />
		</FrameBox>
	);
};

H41FrameContainer.displayName = "H41Frame";




