import { P62FormContainer } from "@/modules/P62/P62FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P62FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P62Toolbar /> */}
			{/* 表單 */}
			<P62FormContainer />
		</FrameBox>
	);
};

P62FrameContainer.displayName = "P62Frame";









