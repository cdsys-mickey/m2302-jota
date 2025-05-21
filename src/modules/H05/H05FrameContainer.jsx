import { H05FormContainer } from "@/modules/H05/H05FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H05FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H05Toolbar /> */}
			{/* 表單 */}
			<H05FormContainer />
		</FrameBox>
	);
};

H05FrameContainer.displayName = "H05Frame";






