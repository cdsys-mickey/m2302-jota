import { FrameBanner, FrameBox } from "@/shared-components";
import P37Toolbar from "./P37Toolbar";
import P37FormContainer from "./form/P37FormContainer";


export const P37FrameContainer = () => {

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner>

			</FrameBanner>
			<P37FormContainer />
		</FrameBox>
	);
};

P37FrameContainer.displayName = "P37FrameContainer";



