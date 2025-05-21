import { D05DialogContainer } from "@/components/jobs/D05/dialog/D05DialogContainer";
import D05ListHeader from "@/components/jobs/D05/list/D05ListHeader";
import D05ListToolbar from "@/components/jobs/D05/list/D05ListToolbar";
import { D05ListViewContainer } from "@/components/jobs/D05/list/D05ListViewContainer";
import D05SearchFormContainer from "@/components/jobs/D05/search/D05SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";

export const D05FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				<FrameBanner>
					{/* {<D05SearchFieldContainer name="q" />} */}
				</FrameBanner>
				<ResponsiveLayout>
					<D05SearchFormContainer initSize="md" />
					<D05ListToolbar />
					<D05ListHeader />
					<D05ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>
			<D05DialogContainer />
		</FrameBox>
	);
};

D05FrameContainer.displayName = "D05FrameContainer";
