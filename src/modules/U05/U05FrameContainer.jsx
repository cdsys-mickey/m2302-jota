import { U05FormContainer } from "@/modules/U05/U05FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const U05FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <U05Toolbar /> */}
			{/* 表單 */}
			<U05FormContainer />
		</FrameBox>
	);
};

U05FrameContainer.displayName = "U05Frame";



