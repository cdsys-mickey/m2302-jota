import TourGroupTypes from "@/components/TourGroupTypePicker/TourGroupTypes.mjs";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P38TitleContext from "../P38TitleContext";
import P38TitleFormView from "./P38TitleFormView";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

const P38TitleFormContainer = (props) => {
	const { ...rest } = props;
	const p38Title = useContext(P38TitleContext);
	// const form = useFormContext();
	const form = useForm({
		defaultValues: {

		}
	});

	const formMeta = useFormMeta(
		`
		Head,
		Tail,
		CmsCalc,
		`
	)

	const handleSubmit = form.handleSubmit(p38Title.onSubmit, p38Title.onSubmitError);
	useHotkeys(["Control+Enter"], () => {
		if (p38Title.editing) {
			setTimeout(handleSubmit)
		}
	}, {
		enableOnFormTags: true
	})

	useInit(() => {
		p38Title.loadItem({ id: TourGroupTypes.getDefaultValue() });
	}, []);

	useChangeTracking(() => {
		if (p38Title.itemDataReady) {
			form.reset(p38Title.itemData);
		}
	}, [p38Title.itemData, p38Title.itemDataReady]);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta}>
				<P38TitleFormView
					loadWorking={p38Title.loadWorking}
					loadError={p38Title.loadError}
					{...rest}
				/>
			</FormMetaProvider>
		</FormProvider>
	);
}

P38TitleFormContainer.displayName = "P38FormContainer";
export default P38TitleFormContainer;
