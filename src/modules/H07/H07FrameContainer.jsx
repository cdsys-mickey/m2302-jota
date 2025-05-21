import { H07FormContainer } from "@/modules/H07/H07FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H07FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H07Toolbar /> */}
			{/* 表單 */}
			<H07FormContainer />
		</FrameBox>
	);
};

H07FrameContainer.displayName = "H07Frame";





