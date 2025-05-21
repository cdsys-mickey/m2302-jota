import { A19FormContainer } from "@/components/jobs/A19/A19FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const A19FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <A19Toolbar /> */}
			{/* 表單 */}
			<A19FormContainer />
		</FrameBox>
	);
};

A19FrameContainer.displayName = "A19Frame";
