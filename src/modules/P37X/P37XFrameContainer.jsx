import { FrameBanner, FrameBox } from "@/shared-components";
import P37XFormContainer from "./form/P37XFormContainer";


export const P37XFrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner>

			</FrameBanner>
			{/* 工具列 */}
			{/* <P37XToolbar /> */}
			<P37XFormContainer />
		</FrameBox>
	);
};

P37XFrameContainer.displayName = "P37XFrameContainer";




