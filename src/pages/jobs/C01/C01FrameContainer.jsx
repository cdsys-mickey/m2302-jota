import { C01DialogContainer } from "@/components/jobs/C01/dialog/C01DialogContainer";
import C01TransformToOrderDialogContainer from "@/components/jobs/C01/dialog/transform-to-order/C01TransformToOrderDialogContainer";
import C01TransformToOrdersDialogContainer from "@/components/jobs/C01/dialog/transform-to-order/C01TransformToOrdersDialogContainer";
import C01ListHeader from "@/components/jobs/C01/list/C01ListHeader";
import { C01ListViewContainer } from "@/components/jobs/C01/list/C01ListViewContainer";
import { C01SearchFormContainer } from "@/components/jobs/C01/list/C01SearchFormContainer";
import C01 from "@/modules/C01.mjs";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";
import { FrameBanner, FrameBox } from "@/shared-components";

export const C01FrameContainer = () => {
	const form = useForm({
		defaultValues: {
			listMode: C01.getOptionById(C01.ListModes.NOT_ORDERED_INCLUDED),
		},
	});


	return (
		<FrameBox>
			<FormProvider {...form}>
				{/* 標題 */}
				<FrameBanner>
					{/* <C01SearchFieldContainer name="q" /> */}
				</FrameBanner>
				<ResponsiveLayout>
					{/* 搜尋列 + 工具列 */}
					<C01SearchFormContainer />

					{/* 列表 */}
					<C01ListHeader />
					<C01ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<C01TransformToOrdersDialogContainer />
			<C01TransformToOrderDialogContainer />
			<C01DialogContainer />

		</FrameBox>
	);
};

C01FrameContainer.displayName = "C01FrameContainer";
