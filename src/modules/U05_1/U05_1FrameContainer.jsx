import { U05_1FormContainer } from "./U05_1FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const U05_1FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <U051Toolbar /> */}
			{/* 表單 */}
			<U05_1FormContainer />
		</FrameBox>
	);
};

U05_1FrameContainer.displayName = "U05_1FrameContainer";




