import { E021DialogContainer } from "@/modules/E021/dialog/E021DialogContainer";
import E021ListHeader from "@/modules/E021/list/E021ListHeader";
import E021ListToolbar from "@/modules/E021/list/E021ListToolbar";
import { E021ListViewContainer } from "@/modules/E021/list/E021ListViewContainer";
import { E021SearchFormContainer } from "@/modules/E021/search/E021SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const E021FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {
			// lvSquared: E021.getSquaredOptionById(E021.SquaredState.NONE),
			// lvSalesType: E021.getSalesTypeOptionById(E021.SalesType.NONE)
		}
	});


	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner></FrameBanner>
				{/* 篩選工具列 */}
				<E021SearchFormContainer initSize="md" />
				{/* 工具列 */}
				<E021ListToolbar />
				{/* 列表 */}
				<E021ListHeader />
				<E021ListViewContainer />
				{/* 對話框 */}
				<E021DialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

E021FrameContainer.displayName = "E021FrameContainer";



