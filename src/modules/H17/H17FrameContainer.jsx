import { H17FormContainer } from "@/modules/H17/H17FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H17FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H17Toolbar /> */}
			{/* 表單 */}
			<H17FormContainer />
		</FrameBox>
	);
};

H17FrameContainer.displayName = "H17Frame";






