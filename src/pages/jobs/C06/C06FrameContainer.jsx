import { C06DialogContainer } from "@/components/jobs/C06/dialog/C06DialogContainer";
import C06ListHeader from "@/components/jobs/C06/list/C06ListHeader";
import C06ListToolbar from "@/components/jobs/C06/list/C06ListToolbar";
import { C06ListViewContainer } from "@/components/jobs/C06/list/C06ListViewContainer";
import C06SearchFormContainer from "@/components/jobs/C06/search/C06SearchFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ResponsiveLayout from "@/shared-components/responsive/ResponsiveLayout";
import { FormProvider, useForm } from "react-hook-form";

export const C06FrameContainer = () => {
	const searchForm = useForm({
		defaultValues: {},
	});

	return (
		<FrameBox>
			<FormProvider {...searchForm}>

				<FrameBanner>
					{/* {<C06SearchFieldContainer name="q" />} */}
				</FrameBanner>
				<ResponsiveLayout>
					<C06SearchFormContainer initSize="md" />
					{/* <C06FormContainer /> */}
					<C06ListToolbar />
					<C06ListHeader />
					<C06ListViewContainer />
				</ResponsiveLayout>
			</FormProvider>
			<C06DialogContainer />

		</FrameBox>
	);
};

C06FrameContainer.displayName = "C06FrameContainer";
