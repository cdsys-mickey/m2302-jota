import { P63FormContainer } from "@/modules/P63/P63FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P63FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P63Toolbar /> */}
			{/* 表單 */}
			<P63FormContainer />
		</FrameBox>
	);
};

P63FrameContainer.displayName = "P63Frame";









