import { REBFormContainer } from "@/modules/REB/REBFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import REBToolbar from "./REBToolbar";
export const REBFrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <REBToolbar /> */}
			{/* 表單 */}
			<REBFormContainer />
		</FrameBox>
	);
};

REBFrameContainer.displayName = "REBFrame";








