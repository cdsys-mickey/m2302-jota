import { H16FormContainer } from "@/modules/H16/H16FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H16FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H16Toolbar /> */}
			{/* 表單 */}
			<H16FormContainer />
		</FrameBox>
	);
};

H16FrameContainer.displayName = "H16Frame";






