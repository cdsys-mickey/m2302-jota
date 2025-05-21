import { H37FormContainer } from "@/modules/H37/H37FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H37FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H37Toolbar /> */}
			{/* 表單 */}
			<H37FormContainer />
		</FrameBox>
	);
};

H37FrameContainer.displayName = "H37Frame";




