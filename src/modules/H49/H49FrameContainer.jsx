import { H49FormContainer } from "@/modules/H49/H49FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H49FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H49Toolbar /> */}
			{/* 表單 */}
			<H49FormContainer />
		</FrameBox>
	);
};

H49FrameContainer.displayName = "H49Frame";





