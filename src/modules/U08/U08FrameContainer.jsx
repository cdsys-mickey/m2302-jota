import { U08FormContainer } from "@/modules/U08/U08FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const U08FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <U08Toolbar /> */}
			{/* 表單 */}
			<U08FormContainer />
		</FrameBox>
	);
};

U08FrameContainer.displayName = "U08Frame";



