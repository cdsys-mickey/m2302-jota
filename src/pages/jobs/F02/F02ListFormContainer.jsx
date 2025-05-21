import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import F02ListForm from "./F02ListForm";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import { F02Context } from "@/pages/jobs/F02/F02Context";
import { useEffect } from "react";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const F02ListFormContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const { reset } = form;
	const f02 = useContext(F02Context);
	const formMeta = useFormMeta(
		`
		ActDate,
		`
	)

	useInit(() => {
		f02.load();
	}, []);

	useChangeTracking(() => {
		if (f02.itemDataReady) {
			console.log("f02 form reset", f02.itemData);
			reset(f02.itemData);
		}
	}, [f02.itemData, f02.itemDataReady]);

	return (
		<FormMetaProvider {...formMeta}>
			<F02ListForm  {...rest} />
		</FormMetaProvider>
	)
}

F02ListFormContainer.displayName = "F02ListFormContainer";
