import { A28FormContainer } from "@/modules/A28/A28FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const A28FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <A28Toolbar /> */}
			{/* 表單 */}
			<A28FormContainer />
		</FrameBox>
	);
};

A28FrameContainer.displayName = "A28Frame";









