import { H01FormContainer } from "@/modules/H01/H01FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H01FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H01Toolbar /> */}
			{/* 表單 */}
			<H01FormContainer />
		</FrameBox>
	);
};

H01FrameContainer.displayName = "H01Frame";


