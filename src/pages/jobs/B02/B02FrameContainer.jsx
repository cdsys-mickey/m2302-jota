import { B02DialogContainer } from "@/components/jobs/B02/dialog/B02DialogContainer";
import { B02ListFormContainer } from "@/components/jobs/B02/list/B02ListFormContainer";
import B02ListHeader from "@/components/jobs/B02/list/B02ListHeader";
import B02ListToolbarContainer from "@/components/jobs/B02/list/B02ListToolbarContainer";
import { B02ListViewContainer } from "@/components/jobs/B02/list/B02ListViewContainer";
import { BContext } from "@/contexts/B/BContext";
import { B02Context } from "@/contexts/B02/B02Context";
import { B04Context } from "@/contexts/B04/B04Context";
import { FrameBanner, FrameBox } from "@/shared-components";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";

export const B02FrameContainer = () => {
	const form = useForm();
	const b = useContext(BContext);
	const b02 = useContext(b.forNew ? B04Context : B02Context);

	const handleSubmit = form.handleSubmit(
		b02.onPrintSubmit,
		b02.onPrintSubmitError
	);

	useHotkeys(["Shift+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return (
		<FormProvider {...form}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{/* {<B02SearchFieldContainer name="q" />} */}
				</FrameBanner>
				{/* 篩選工具列 */}
				<B02ListFormContainer />
				{/* 工具列 */}
				<B02ListToolbarContainer />
				{/* 列表 */}
				<B02ListHeader />
				<B02ListViewContainer />
				{/* 對話框 */}
				<B02DialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

B02FrameContainer.displayName = "B02FrameContainer";


