import { P51FormContainer } from "@/modules/P51/P51FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P51FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P51Toolbar /> */}
			{/* 表單 */}
			<P51FormContainer />
		</FrameBox>
	);
};

P51FrameContainer.displayName = "P51Frame";






