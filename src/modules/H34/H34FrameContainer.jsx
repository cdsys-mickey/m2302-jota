import { H34FormContainer } from "@/modules/H34/H34FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

const H34FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H34Toolbar /> */}
			{/* 表單 */}
			<H34FormContainer />
		</FrameBox>
	);
};
H34FrameContainer.displayName = "H34Frame";
export default H34FrameContainer;







