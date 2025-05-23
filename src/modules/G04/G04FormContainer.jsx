import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import G04Form from "./G04Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { G04Context } from "./G04Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useCallback } from "react";
import { useInit } from "@/shared-hooks/useInit";
import StdPrint from "../StdPrint.mjs";
import Forms from "@/shared-modules/Forms.mjs";
import DateFormats from "@/shared-modules/sd-date-formats";

export const G04FormContainer = () => {
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
			delSession,
			delRecGroup,
			delCustID,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			g04.onSubmit,
			g04.onSubmitError
		)
	}, [g04.onSubmit, g04.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			g04.onDebugSubmit,
		)
	}, [g04.onDebugSubmit, form]);

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

	useInit(async () => {
		const cutYM = await g04.getCutYM();
		reset({
			outputType: StdPrint.getDefaultOption(),
			CutYM: cutYM ? Forms.parseDate(cutYM, DateFormats.DATEFNS_YEAR_AND_MONTH) : null
		})
	}, []);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
				<G04Form onSubmit={onSubmit}
					selectedTab={g04.selectedTab}
					handleTabChange={g04.handleTabChange}
				/>
			</FormMetaProvider>
		</FormProvider>
	);
};

G04FormContainer.displayName = "G04FormContainer";






