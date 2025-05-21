import { H43FormContainer } from "@/modules/H43/H43FormContainer";

const H43FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <H43Toolbar /> */}
			{/* 表單 */}
			<H43FormContainer />
		</FrameBox>
	);
};
H43FrameContainer.displayName = "H43Frame";
export default H43FrameContainer;








