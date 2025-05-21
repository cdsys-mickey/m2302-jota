import { G09FormContainer } from "@/modules/G09/G09FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const G09FrameContainer = () => {
	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <G09Toolbar /> */}
			{/* 表單 */}
			<G09FormContainer />
		</FrameBox>
	);
};

G09FrameContainer.displayName = "G09Frame";





