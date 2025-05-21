import { U03FormContainer } from "@/modules/U03/U03FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const U03FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <U03Toolbar /> */}
			{/* 表單 */}
			<U03FormContainer />
		</FrameBox>
	);
};

U03FrameContainer.displayName = "U03Frame";



