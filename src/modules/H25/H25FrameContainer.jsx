import { H25FormContainer } from "@/modules/H25/H25FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H25FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H25Toolbar /> */}
			{/* 表單 */}
			<H25FormContainer />
		</FrameBox>
	);
};

H25FrameContainer.displayName = "H25Frame";



