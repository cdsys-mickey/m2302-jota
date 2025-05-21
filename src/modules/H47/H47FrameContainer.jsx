import { H47FormContainer } from "@/modules/H47/H47FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H47FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H47Toolbar /> */}
			{/* 表單 */}
			<H47FormContainer />
		</FrameBox>
	);
};

H47FrameContainer.displayName = "H47Frame";






