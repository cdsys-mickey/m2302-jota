import { G04FormContainer } from "@/modules/G04/G04FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const G04FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <G04Toolbar /> */}
			{/* 表單 */}
			<G04FormContainer />
		</FrameBox>
	);
};

G04FrameContainer.displayName = "G04Frame";






