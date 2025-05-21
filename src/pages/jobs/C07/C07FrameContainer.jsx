import { C07DialogContainer } from "@/components/jobs/C07/dialog/C07DialogContainer";
import C07ListHeader from "@/components/jobs/C07/list/C07ListHeader";
import C07ListToolbar from "@/components/jobs/C07/list/C07ListToolbar";
import { C07ListViewContainer } from "@/components/jobs/C07/list/C07ListViewContainer";
import C07SearchFormContainer from "@/components/jobs/C07/search/C07SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";

export const C07FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				<FrameBanner>
					{/* {<C07SearchFieldContainer name="q" />} */}
				</FrameBanner>
				<ResponsiveLayout columns={24} >
					<C07SearchFormContainer initSize="md" />
					<C07ListToolbar />
					<C07ListHeader />
					<C07ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>
			<C07DialogContainer />

		</FrameBox>
	);
};

C07FrameContainer.displayName = "C07FrameContainer";
