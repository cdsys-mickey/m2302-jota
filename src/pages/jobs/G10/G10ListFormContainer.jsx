import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import G10ListForm from "./G10ListForm";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import { G10Context } from "@/pages/jobs/G10/G10Context";
import { useEffect } from "react";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

export const G10ListFormContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const { reset } = form;
	const g10 = useContext(G10Context);
	const formMeta = useFormMeta(
		`
		ActDate,
		`
	)

	useInit(() => {
		g10.load();
	}, []);

	useChangeTracking(() => {
		if (g10.itemDataReady) {
			console.log("g10 form reset", g10.itemData);
			reset(g10.itemData);
		}
	}, [g10.itemData, g10.itemDataReady]);

	return (
		<FormMetaProvider {...formMeta}>
			<G10ListForm  {...rest} />
		</FormMetaProvider>
	)
}

G10ListFormContainer.displayName = "G10ListFormContainer";





