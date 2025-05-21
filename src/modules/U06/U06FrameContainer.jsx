import { U06FormContainer } from "@/modules/U06/U06FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const U06FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <U06Toolbar /> */}
			{/* 表單 */}
			<U06FormContainer />
		</FrameBox>
	);
};

U06FrameContainer.displayName = "U06Frame";


