import { H02FormContainer } from "@/modules/H02/H02FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H02FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H02Toolbar /> */}
			{/* 表單 */}
			<H02FormContainer />
		</FrameBox>
	);
};

H02FrameContainer.displayName = "H02Frame";


