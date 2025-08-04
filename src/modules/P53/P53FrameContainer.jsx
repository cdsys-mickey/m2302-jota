import { P53FormContainer } from "@/modules/P53/P53FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P53FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P53Toolbar /> */}
			{/* 表單 */}
			<P53FormContainer />
		</FrameBox>
	);
};

P53FrameContainer.displayName = "P53Frame";




