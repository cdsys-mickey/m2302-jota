import { H44FormContainer } from "@/modules/H44/H44FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H44FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H44Toolbar /> */}
			{/* 表單 */}
			<H44FormContainer />
		</FrameBox>
	);
};

H44FrameContainer.displayName = "H44Frame";






