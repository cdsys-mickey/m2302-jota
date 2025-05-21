import { H53FormContainer } from "@/modules/H53/H53FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H53FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H53Toolbar /> */}
			{/* 表單 */}
			<H53FormContainer />
		</FrameBox>
	);
};

H53FrameContainer.displayName = "H53Frame";






