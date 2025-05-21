import { H04FormContainer } from "@/modules/H04/H04FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const H04FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H04Toolbar /> */}
			{/* 表單 */}
			<H04FormContainer />
		</FrameBox>
	);
};

H04FrameContainer.displayName = "H04Frame";




