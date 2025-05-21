import { U07FormContainer } from "@/modules/U07/U07FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const U07FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <U07Toolbar /> */}
			{/* 表單 */}
			<U07FormContainer />
		</FrameBox>
	);
};

U07FrameContainer.displayName = "U07Frame";



