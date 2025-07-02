import { G07FormContainer } from "@/modules/G07/G07FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import G07Toolbar from "./G07Toolbar";
export const G07FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <G07Toolbar /> */}
			{/* 表單 */}
			<G07FormContainer />
		</FrameBox>
	);
};

G07FrameContainer.displayName = "G07Frame";







