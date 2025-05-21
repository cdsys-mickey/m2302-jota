import { P15FormContainer } from "@/modules/P15/P15FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

export const P15FrameContainer = () => {


	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <P15Toolbar /> */}
			{/* 表單 */}
			<P15FormContainer />
		</FrameBox>
	);
};

P15FrameContainer.displayName = "P15Frame";



