import { H45FormContainer } from "@/modules/H45/H45FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H45FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H45Toolbar /> */}
			{/* 表單 */}
			<H45FormContainer />
		</FrameBox>
	);
};

H45FrameContainer.displayName = "H45Frame";




