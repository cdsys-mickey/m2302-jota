import { U06_1FormContainer } from "@/modules/U06_1/U06_1FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const U061FrameContainer = () => {
	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <U061Toolbar /> */}
			{/* 表單 */}
			<U06_1FormContainer />
		</FrameBox>
	);
};

U061FrameContainer.displayName = "U061Frame";



