import { U04FormContainer } from "@/modules/U04/U04FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const U04FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <U04Toolbar /> */}
			{/* 表單 */}
			<U04FormContainer />
		</FrameBox>
	);
};

U04FrameContainer.displayName = "U04Frame";



