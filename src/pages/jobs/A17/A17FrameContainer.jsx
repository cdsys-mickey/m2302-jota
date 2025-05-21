import { A17FormContainer } from "@/components/jobs/A17/A17FormContainer";
import A17Toolbar from "@/components/jobs/A17/A17Toolbar";
import { A17Context } from "@/contexts/A17/A17Context";
import { useUnload } from "@/shared-hooks/useUnload";
import { useContext } from "react";
import { FrameBanner, FrameBox } from "@/shared-components";

export const A17FrameContainer = () => {
	const a17 = useContext(A17Context);

	useUnload(() => {
		a17.cancelAction();
	}, []);

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>
			{/* 工具列 */}
			<A17Toolbar />

			{/* 對話框 */}
			<A17FormContainer />
		</FrameBox>
	);
};

A17FrameContainer.displayName = "A17Frame";
