import TourGroupTypes from "@/components/TourGroupTypePicker/TourGroupTypes.mjs";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P38Context from "../P38Context";
import P38FormView from "./P38FormView";
import { useFormMeta } from "@/shared-components/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-components";
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";

const P38FormContainer = (props) => {
	const { ...rest } = props;
	const p38 = useContext(P38Context);
	const form = useFormContext();

	const formMeta = useFormMeta(
		`
		Head,
		Tail,
		CmsCalc,
		`
	)

	const handleSubmit = form.handleSubmit(p38.onSubmit, p38.onSubmitError);
	useHotkeys(["Control+Enter"], () => {
		if (p38.editing) {
			setTimeout(handleSubmit)
		}
	}, {
		enableOnFormTags: true
	})

	useInit(() => {
		p38.loadItem({ id: TourGroupTypes.getDefaultValue() });
	}, []);

	useChangeTracking(() => {
		if (p38.itemDataReady) {
			form.reset(p38.itemData);
		}
	}, [p38.itemData, p38.itemDataReady]);

	return (

		<FormMetaProvider {...formMeta}>
			<P38FormView
				loadWorking={p38.loadWorking}
				loadError={p38.loadError}
				{...rest}
			/>
		</FormMetaProvider>
	);
}

P38FormContainer.displayName = "P38FormContainer";
export default P38FormContainer;
