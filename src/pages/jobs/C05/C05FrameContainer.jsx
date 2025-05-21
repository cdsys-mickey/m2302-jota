import { C05DialogContainer } from "@/components/jobs/C05/dialog/C05DialogContainer";
import C05ListHeader from "@/components/jobs/C05/list/C05ListHeader";
import C05ListToolbar from "@/components/jobs/C05/list/C05ListToolbar";
import { C05ListViewContainer } from "@/components/jobs/C05/list/C05ListViewContainer";
import { C05SearchFormContainer } from "@/components/jobs/C05/search/C05SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";

export const C05FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {
			rd: null,
			rd2: null
		},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>
				<FrameBanner>
					{/* {<C05SearchFieldContainer name="q" />} */}
				</FrameBanner>
				<ResponsiveLayout initSize="md">
					<C05SearchFormContainer />
					<C05ListToolbar />
					<C05ListHeader />
					<C05ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>
			<C05DialogContainer />

		</FrameBox>
	);
};

C05FrameContainer.displayName = "C05FrameContainer";
