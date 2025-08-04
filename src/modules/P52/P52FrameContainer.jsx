import { P52FormContainer } from "@/modules/P52/P52FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P52FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P52Toolbar /> */}
			{/* 表單 */}
			<P52FormContainer />
		</FrameBox>
	);
};

P52FrameContainer.displayName = "P52Frame";







