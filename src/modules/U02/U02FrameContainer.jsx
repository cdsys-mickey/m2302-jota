import { U02FormContainer } from "@/modules/U02/U02FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const U02FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <U02Toolbar /> */}
			{/* 表單 */}
			<U02FormContainer />
		</FrameBox>
	);
};

U02FrameContainer.displayName = "U02Frame";



