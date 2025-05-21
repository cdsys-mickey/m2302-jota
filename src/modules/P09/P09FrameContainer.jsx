import { P09FormContainer } from "@/modules/P09/P09FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P09FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P09Toolbar /> */}
			{/* 表單 */}
			<P09FormContainer />
		</FrameBox>
	);
};

P09FrameContainer.displayName = "P09Frame";







