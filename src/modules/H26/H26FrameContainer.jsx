import { H26FormContainer } from "@/modules/H26/H26FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

const H26FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H26Toolbar /> */}
			{/* 表單 */}
			<H26FormContainer />
		</FrameBox>
	);
};
H26FrameContainer.displayName = "H26Frame";
export default H26FrameContainer;







