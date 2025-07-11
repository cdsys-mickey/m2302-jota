import { A19FormContainer } from "@/components/jobs/A19/A19FormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const A19FrameContainer = () => {
	const form = useForm();

	return (
		<FrameBox>
			{/* 標題 */}
			<FrameBanner></FrameBanner>

			{/* 工具列 */}
			{/* <A19Toolbar /> */}
			{/* 表單 */}
			<FormProvider {...form}>
				<A19FormContainer />
			</FormProvider>
		</FrameBox>
	);
};

A19FrameContainer.displayName = "A19Frame";
