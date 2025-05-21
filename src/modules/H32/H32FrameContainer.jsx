import { H32FormContainer } from "@/modules/H32/H32FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H32FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H32Toolbar /> */}
			{/* 表單 */}
			<H32FormContainer />
		</FrameBox>
	);
};

H32FrameContainer.displayName = "H32Frame";




