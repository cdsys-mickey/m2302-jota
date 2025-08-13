import { AuthContext } from "@/contexts/auth/AuthContext";
import { REBContext } from "@/modules/REB/REBContext";
import { FormMetaProvider } from "@/shared-components";
import { useContext, useMemo } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import REB from "./REB.mjs";
import REBForm from "./REBForm";

export const REBFormContainer = () => {
	const form = useFormContext();
	const reb = useContext(REBContext);
	const auth = useContext(AuthContext);

	const handleSubmit = form.handleSubmit(reb.onSubmit, reb.onSubmitError);

	const handlePosRebuildSubmit = form.handleSubmit(reb.onPosRebuildSubmit, reb.onPosRebuildSubmitError);

	const handleDefaultAction = useMemo(() => {
		if (reb.selectedTab == REB.TabType.SALES_DATA) {
			return handleSubmit;
		} else if (reb.selectedTab == REB.TabType.POS_DATA) {
			return handlePosRebuildSubmit;
		}
		return null;
	}, [reb.selectedTab, handleSubmit, handlePosRebuildSubmit])

	useHotkeys(["Control+Enter"], () => setTimeout(handleDefaultAction), {
		enableOnFormTags: true
	})

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...reb.formMeta}>
				<REBForm
					selectedTab={reb.selectedTab}
					handleTabChange={reb.handleTabChange}
					impersonate={auth.impersonate}
				/>
			</FormMetaProvider>
		</FormProvider>
	);
};

REBFormContainer.displayName = "REBFormContainer";









