import { P42DialogContainer } from "@/modules/P42/dialog/P42DialogContainer";
import P42ListHeader from "@/modules/P42/list/P42ListHeader";
import { P42ListViewContainer } from "@/modules/P42/list/P42ListViewContainer";
import { FormProvider, useForm } from "react-hook-form";


import { FrameBanner, FrameBox } from "@/shared-components";
import P42Toolbar from "./P42Toolbar";
import { P42SearchFieldContainer } from "./search/P42SearchFieldContainer";


export const P42FrameContainer = () => {
	const searchForm = useForm();
	const form = useForm({
		defaultValues: {},
	});

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{<P42SearchFieldContainer name="qs" />}
				</FrameBanner>
				{/* 工具列 */}
				<P42Toolbar />
				{/* 列表 */}
				<P42ListHeader />
				<P42ListViewContainer />
				{/* 對話框 */}
				<FormProvider {...form}>
					<P42DialogContainer />
				</FormProvider>

			</FrameBox>
		</FormProvider>
	);
};

P42FrameContainer.displayName = "P42Frame";




