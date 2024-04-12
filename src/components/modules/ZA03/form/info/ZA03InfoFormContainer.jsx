import { useContext } from "react";
import ZA03InfoForm from "./ZA03InfoForm";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";

export const ZA03InfoFormContainer = () => {
	const form = useForm({
		defaultValues: {
			depts: [],
		},
	});
	const { reset } = form;
	const za03 = useContext(ZA03Context);

	const { itemDataReady, itemData } = za03;

	useEffect(() => {
		if (itemDataReady) {
			console.log(`za03 form reset`, itemData);
			reset(itemData);
		}
	}, [reset, itemData, itemDataReady]);

	return (
		<FormProvider {...form}>
			<ZA03InfoForm
				data={za03.itemData}
				updating={za03.updating}
				editing={za03.editing}
				deptDisabled={true}
				onSubmit={form.handleSubmit(
					za03.onEditorSubmit,
					za03.onEditorSubmitError
				)}
				readError={za03.readError}
			/>
		</FormProvider>
	);
};

ZA03InfoFormContainer.displayName = "ZA03InfoFormContainer";
