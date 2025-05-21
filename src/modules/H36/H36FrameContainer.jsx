import { H36FormContainer } from "@/modules/H36/H36FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H36FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H36Toolbar /> */}
			{/* 表單 */}
			<H36FormContainer />
		</FrameBox>
	);
};

H36FrameContainer.displayName = "H36Frame";



