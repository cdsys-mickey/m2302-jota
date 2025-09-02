import { P41DialogContainer } from "@/modules/P41/dialog/P41DialogContainer";
import P41ListHeader from "@/modules/P41/list/P41ListHeader";
import { P41ListViewContainer } from "@/modules/P41/list/P41ListViewContainer";
import { FormProvider, useForm } from "react-hook-form";


import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import P41 from "./P41.mjs";
import P41SearchFormContainer from "./search/P41SearchFormContainer";


export const P41FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: P41.getDefaultValues()
	});

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{/* {<P41SearchFieldContainer name="qs" />} */}
				</FrameBanner>
				<ResponsiveLayout initSize="md">
					<P41SearchFormContainer />
					{/* 工具列 */}

					{/* 列表 */}
					<P41ListHeader />
					<P41ListViewContainer />
				</ResponsiveLayout>
				{/* 對話框 */}
				<P41DialogContainer />

			</FrameBox>
		</FormProvider>
	);
};

P41FrameContainer.displayName = "P41Frame";



