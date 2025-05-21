import { H52FormContainer } from "@/modules/H52/H52FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H52FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H52Toolbar /> */}
			{/* 表單 */}
			<H52FormContainer />
		</FrameBox>
	);
};

H52FrameContainer.displayName = "H52Frame";





