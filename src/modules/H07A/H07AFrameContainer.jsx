import { H07AFormContainer } from "@/modules/H07A/H07AFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H07AFrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H07AToolbar /> */}
			{/* 表單 */}
			<H07AFormContainer />
		</FrameBox>
	);
};

H07AFrameContainer.displayName = "H07AFrame";






