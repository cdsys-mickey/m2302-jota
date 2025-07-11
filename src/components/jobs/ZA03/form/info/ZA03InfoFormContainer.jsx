import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import ZA03InfoForm from "./ZA03InfoForm";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { useCallback } from "react";
import { FormMetaProvider } from "@/shared-components";

export const ZA03InfoFormContainer = () => {
	const za03 = useContext(ZA03Context);

	const form = useForm({
		defaultValues: {
			depts: [],
		},
	});

	const formMeta = useFormMeta(
		`
		LoginName,
		UserName,
		Tel,
		Cel,
		Email,
		dept,
		userClass,
		depts
		`
	)

	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "LoginName":
					return za03.updating;
				default:
					return false;
			}
		},
		[za03.updating]
	);

	return (
		<FormMetaProvider {...formMeta} isFieldDisabled={isFieldDisabled}>
			<ZA03InfoForm
				data={za03.itemData}
				creating={za03.creating}
				updating={za03.updating}
				editing={za03.editing}
				onSubmit={form.handleSubmit(
					za03.onEditorSubmit,
					za03.onEditorSubmitError
				)}
				readError={za03.readError}
			// handleDeptChange={za03.handleDeptChange({ setValue: form.setValue, getValues: form.getValues })}
			/>
		</FormMetaProvider>
	);
};

ZA03InfoFormContainer.displayName = "ZA03InfoFormContainer";
