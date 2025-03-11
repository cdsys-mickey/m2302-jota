import { FormProvider, useFormContext, useWatch } from "react-hook-form";
import H21Form from "./H21Form";
import { useContext } from "react";
import { useMemo } from "react";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { H21Context } from "./H21Context";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { useCallback } from "react";
import { useInit } from "@/shared-hooks/useInit";
import StdPrint from "../StdPrint.mjs";
import Forms from "@/shared-modules/Forms.mjs";
import DateFormats from "@/shared-modules/sd-date-formats";

export const H21FormContainer = () => {
	const form = useFormContext();
	const { reset } = form;
	const h21 = useContext(H21Context);

	const formMeta = useFormMeta(
		`
			CutYM,
			SProdID,
			EProdID,
			catL,
			catM,
			catS,
			counter,
			outputType,
			`
	)

	const onSubmit = useMemo(() => {
		return form.handleSubmit(
			h21.onSubmit,
			h21.onSubmitError
		)
	}, [h21.onSubmit, h21.onSubmitError, form]);

	const onDebugSubmit = useMemo(() => {
		return form.handleSubmit(
			h21.onDebugSubmit,
		)
	}, [h21.onDebugSubmit, form]);

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
		const cutYM = await h21.getCutYM();
		reset({
			outputType: StdPrint.getDefaultOption(),
			CutYM: cutYM ? Forms.parseDate(cutYM, DateFormats.DATEFNS_YEAR_AND_MONTH) : null
		})
	}, []);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
				<H21Form onSubmit={onSubmit} onDebugSubmit={onDebugSubmit} />
			</FormMetaProvider>
		</FormProvider>
	);
};

H21FormContainer.displayName = "H21FormContainer";




