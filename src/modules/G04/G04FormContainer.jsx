
import { FormMetaProvider } from "@/shared-components";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useInit } from "@/shared-hooks/useInit";
import { useCallback, useContext, useMemo } from "react";
import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import G04 from "./G04.mjs";
import { G04Context } from "./G04Context";
import G04Form from "./G04Form";
import { AuthContext } from "@/contexts/auth/AuthContext";

export const G04FormContainer = () => {
	const auth = useContext(AuthContext);
	const form = useFormContext();
	const { reset } = form;
	const g04 = useContext(G04Context);

	const formMeta = useFormMeta(
		`
			AccYM,
			Stage,
			CutDate,
			RecGroup,
			CustID,
			delYM,
			delSession,
			delRecGroup,
			delCustID,
			recYM,
			recSession,
			`
	)

	const catL = useWatch({
		name: "catL",
		control: form.control,
	});

	const catM = useWatch({
		name: "catM",
		control: form.control,
	});

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "catM":
					return !catL;
				case "catS":
					return !catM;
				default:
					return false;
			}
		},
		[catL, catM]
	);



	const handleSubmit = form.handleSubmit(g04.onSubmit, g04.onSubmitError);
	const handleDeleteSubmit = form.handleSubmit(g04.onDeleteSubmit, g04.onDeleteSubmitError);

	const handleDefaultAction = useMemo(() => {
		if (g04.selectedTab == G04.Tabs.CREATE) {
			return handleSubmit;
		} else if (g04.selectedTab == G04.Tabs.DELETE) {
			return handleDeleteSubmit;
		}
		return null;
	}, [g04.selectedTab, handleDeleteSubmit, handleSubmit])

	useHotkeys(["Control+Enter"], () => setTimeout(handleDefaultAction), {
		enableOnFormTags: true
	})

	useInit(async () => {
		reset({
			AccYM: new Date(),
			CutDate: new Date(),
			delYM: null
		})
	}, []);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
				<G04Form
					selectedTab={g04.selectedTab}
					handleTabChange={g04.handleTabChange}
					impersonate={auth.impersonate}
				/>
			</FormMetaProvider>
		</FormProvider>
	);
};

G04FormContainer.displayName = "G04FormContainer";






