import { H35FormContainer } from "@/modules/H35/H35FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

const H35FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H35Toolbar /> */}
			{/* 表單 */}
			<H35FormContainer />
		</FrameBox>
	);
};
H35FrameContainer.displayName = "H35Frame";
export default H35FrameContainer;









