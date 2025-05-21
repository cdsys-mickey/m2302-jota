
import { B06ToolbarContainer } from "@/components/jobs/B06/B06ToolbarContainer";
import { B06SearchFormContainer } from "@/components/jobs/B06/form/B06SearchFormContainer";
import B06ListHeader from "@/components/jobs/B06/list/B06ListHeader";
import { B06ListViewContainer } from "@/components/jobs/B06/list/B06ListViewContainer";
import { B06Context } from "@/contexts/B06/B06Context";
import { B05DialogContainer } from "@/modules/B05/dialog/B05DialogContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";

export const B06FrameContainer = () => {
	const form = useForm();
	const b06 = useContext(B06Context);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			b06.onPrintSubmit,
			b06.onPrintSubmitError
		)
	}, [b06.onPrintSubmit, b06.onPrintSubmitError, form]);

	useHotkeys(["Control+Enter"], () => setTimeout(handleSubmit), {
		enableOnFormTags: true
	})

	return (
		<FormProvider {...form}>
			<FrameBox>
				<FrameBanner></FrameBanner>
				<ResponsiveLayout>
					<B06SearchFormContainer />
					<B06ToolbarContainer />
					<B06ListHeader />
					<B06ListViewContainer />
				</ResponsiveLayout>
				{/* B05 對話框 */}
				<B05DialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

B06FrameContainer.displayName = "B06FrameContainer";
