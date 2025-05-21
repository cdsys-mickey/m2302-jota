import { C03DialogContainer } from "@/components/jobs/C03/dialog/C03DialogContainer";
import C03ListHeader from "@/components/jobs/C03/list/C03ListHeader";
import { C03ListViewContainer } from "@/components/jobs/C03/list/C03ListViewContainer";
import C03SearchFormContainer from "@/components/jobs/C03/search/C03SearchFormContainer";
import { C03Context } from "@/contexts/C03/C03Context";
import C03 from "@/modules/md-c03";
import Squared2 from "@/modules/md-squared2";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { useQuerySync } from "@/shared-hooks/useQuerySync";
import { useCallback, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const C03FrameContainer = () => {
	const c03 = useContext(C03Context);
	const { selectById } = c03;
	const searchForm = useForm({
		defaultValues: {
			lvReviewState: C03.getOptionById(C03.ReviewStates.NOT_REVIEWED),
			lvSquared: Squared2.getOptionById(Squared2.SquaredState.NOT_SQUARED)
			// listMode: null,
		},
	});

	const handleQueryChange = useCallback(
		(newValue) => {
			if (newValue) {
				selectById(newValue);
			}
		},
		[selectById]
	);

	useQuerySync("id", handleQueryChange);

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBanner>
					{/* {<C03SearchFieldContainer name="q" />} */}
				</FrameBanner>
				<ResponsiveLayout>
					<C03SearchFormContainer initSize="md" />
					{/* 列表 */}
					<C03ListHeader />
					<C03ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>

			{/* 對話框 */}
			<C03DialogContainer />

		</FrameBox>
	);
};

C03FrameContainer.displayName = "C03FrameContainer";
