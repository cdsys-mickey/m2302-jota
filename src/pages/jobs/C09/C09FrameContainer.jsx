import { C09DialogContainer } from "@/components/jobs/C09/dialog/C09DialogContainer";
import C09ListHeader from "@/components/jobs/C09/list/C09ListHeader";
import C09ListToolbar from "@/components/jobs/C09/list/C09ListToolbar";
import { C09ListViewContainer } from "@/components/jobs/C09/list/C09ListViewContainer";
import C09SearchFormContainer from "@/components/jobs/C09/search/C09SearchFormContainer";
import { C09Context } from "@/contexts/C09/C09Context";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { useQuerySync } from "@/shared-hooks/useQuerySync";
import { useCallback, useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const C09FrameContainer = () => {
	const c09 = useContext(C09Context);
	const { promptCreating, createWithTxoOrder } = c09;
	const searchForm = useForm({
		defaultValues: {},
	});



	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				<FrameBanner>
					{/* {<C09SearchFieldContainer name="q" />} */}
				</FrameBanner>
				<ResponsiveLayout>
					<C09SearchFormContainer />
					<C09ListToolbar />
					<C09ListHeader />
					<C09ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>
			<C09DialogContainer />
		</FrameBox>
	);
};

C09FrameContainer.displayName = "C09FrameContainer";
