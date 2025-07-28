import { FrameBanner, FrameBox } from "@/shared-components";
import P37FormContainer from "./form/P37FormContainer";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import P37Context from "./P37Context";
import CmsGroupTypes from "@/components/CmsGroupTypePicker/CmsGroupTypes.mjs";


export const P37FrameContainer = () => {
	const p37 = useContext(P37Context);
	useInit(() => {
		p37.loadItem({ id: CmsGroupTypes.Types.DOMESTIC });
	}, []);

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner>

			</FrameBanner>
			{/* 工具列 */}
			{/* <P37Toolbar /> */}
			<P37FormContainer />
		</FrameBox>
	);
};

P37FrameContainer.displayName = "P37FrameContainer";



