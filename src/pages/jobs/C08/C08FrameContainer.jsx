import { C08DialogContainer } from "@/components/jobs/C08/dialog/C08DialogContainer";
import C08ListHeader from "@/components/jobs/C08/list/C08ListHeader";
import C08ListToolbar from "@/components/jobs/C08/list/C08ListToolbar";
import { C08ListViewContainer } from "@/components/jobs/C08/list/C08ListViewContainer";
import C08SearchFormContainer from "@/components/jobs/C08/search/C08SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";

export const C08FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				<FrameBanner>
					{/* <C08SearchFieldContainer name="q" /> */}
				</FrameBanner>
				<ResponsiveLayout>
					<C08SearchFormContainer initSize="md" />
					<C08ListToolbar />
					<C08ListHeader />
					<C08ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>
			<C08DialogContainer />

		</FrameBox>
	);
};

C08FrameContainer.displayName = "C08FrameContainer";
