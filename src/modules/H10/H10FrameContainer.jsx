import { H10FormContainer } from "@/modules/H10/H10FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H10FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H10Toolbar /> */}
			{/* 表單 */}
			<H10FormContainer />
		</FrameBox>
	);
};

H10FrameContainer.displayName = "H10Frame";





