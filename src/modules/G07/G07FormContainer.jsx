import { AuthContext } from "@/contexts/auth/AuthContext";
import { G07Context } from "@/modules/G07/G07Context";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import G07 from "./G07.mjs";
import G07Form from "./G07Form";

export const G07FormContainer = () => {
	const form = useFormContext();
	const g07 = useContext(G07Context);
	const auth = useContext(AuthContext);

	const handleSubmit = form.handleSubmit(g07.onSubmit, g07.onSubmitError);

	const handleRestoreSubmit = form.handleSubmit(g07.onRestoreSubmit, g07.onRestoreSubmitError);

	const handleDefaultAction = useMemo(() => {
		if (g07.selectedTab == G07.Tabs.CARRY) {
			return handleSubmit;
		} else if (g07.selectedTab == G07.Tabs.RESTORE) {
			return handleRestoreSubmit;
		}
		return null;
	}, [g07.selectedTab, handleRestoreSubmit, handleSubmit])

	useHotkeys(["Control+Enter"], () => setTimeout(handleDefaultAction), {
		enableOnFormTags: true
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...g07.formMeta}>
				<G07Form
					selectedTab={g07.selectedTab}
					handleTabChange={g07.handleTabChange}
					impersonate={auth.impersonate}
				/>
			</FormMetaProvider>
		</FormProvider>
	);
};

G07FormContainer.displayName = "G07FormContainer";








