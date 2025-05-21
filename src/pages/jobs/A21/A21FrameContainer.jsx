import { A21FormContainer } from "@/components/jobs/A21/A21FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const A21FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <A21Toolbar /> */}
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<A21FormContainer />
		</FrameBox>
	);
};

A21FrameContainer.displayName = "A21Frame";
