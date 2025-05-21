import { H27FormContainer } from "@/modules/H27/H27FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

const H27FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H27Toolbar /> */}
			{/* 表單 */}
			<H27FormContainer />
		</FrameBox>
	);
};
H27FrameContainer.displayName = "H27Frame";
export default H27FrameContainer;







