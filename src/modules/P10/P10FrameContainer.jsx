import { P10FormContainer } from "@/modules/P10/P10FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P10FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P10Toolbar /> */}
			{/* 表單 */}
			<P10FormContainer />
		</FrameBox>
	);
};

P10FrameContainer.displayName = "P10Frame";



