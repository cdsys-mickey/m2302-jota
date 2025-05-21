import { G05FormContainer } from "@/modules/G05/G05FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const G05FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <G05Toolbar /> */}
			{/* 表單 */}
			<G05FormContainer />
		</FrameBox>
	);
};

G05FrameContainer.displayName = "G05Frame";




