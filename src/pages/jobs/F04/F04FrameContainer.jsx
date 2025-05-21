import { F04FormContainer } from "@/components/jobs/F04/F04FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const F04FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <F04Toolbar /> */}
			{/* <EmptyToolbar /> */}
			{/* 表單 */}
			<F04FormContainer />
		</FrameBox>
	);
};

F04FrameContainer.displayName = "F04Frame";

