import { H50FormContainer } from "@/modules/H50/H50FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H50FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H50Toolbar /> */}
			{/* 表單 */}
			<H50FormContainer />
		</FrameBox>
	);
};

H50FrameContainer.displayName = "H50Frame";




