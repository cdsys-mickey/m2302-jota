import { U01FormContainer } from "@/modules/U01/U01FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const U01FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <U01Toolbar /> */}
			{/* 表單 */}
			<U01FormContainer />
		</FrameBox>
	);
};

U01FrameContainer.displayName = "U01Frame";


