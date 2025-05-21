import { H22FormContainer } from "@/modules/H22/H22FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

const H22FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H22Toolbar /> */}
			{/* 表單 */}
			<H22FormContainer />
		</FrameBox>
	);
};
H22FrameContainer.displayName = "H22Frame";
export default H22FrameContainer;






