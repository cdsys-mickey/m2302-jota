import { E03DialogContainer } from "@/components/jobs/E03/dialog/E03DialogContainer";
import { E03ListFormContainer } from "@/components/jobs/E03/list/E03ListFormContainer";
import E03ListHeader from "@/components/jobs/E03/list/E03ListHeader";
import E03ListToolbar from "@/components/jobs/E03/list/E03ListToolbar";
import { E03ListViewContainer } from "@/components/jobs/E03/list/E03ListViewContainer";
import E03 from "@/modules/E021/E021.mjs";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const E03FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {
			lvSquared: E03.getSquaredOptionById(E03.SquaredState.NONE),
			lvSalesType: E03.getSalesTypeOptionById(E03.SalesType.NONE)
		}
	});

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{/* {<E03SearchFieldContainer name="q" />} */}
				</FrameBanner>
				{ }
				<E03ListFormContainer />
				{/* 工具列 */}
				<E03ListToolbar />
				{/* 列表 */}
				<E03ListHeader />
				<E03ListViewContainer />
				{/* 對話框 */}
				<E03DialogContainer />
			</FrameBox>
		</FormProvider>
	);
};

E03FrameContainer.displayName = "E03FrameContainer";



