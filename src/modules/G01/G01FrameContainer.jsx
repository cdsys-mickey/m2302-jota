import { G01FormContainer } from "@/modules/G01/G01FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const G01FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <G01Toolbar /> */}
			{/* 表單 */}
			<G01FormContainer />
		</FrameBox>
	);
};

G01FrameContainer.displayName = "G01Frame";



