import TourGroupTypes from "@/components/TourGroupTypePicker/TourGroupTypes.mjs";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import P38Context from "../P38Context";
import P38FormView from "./P38FormView";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { useFormMeta } from "@/shared-contexts/form-meta/useFormMeta";
import { FormMetaProvider } from "@/shared-contexts/form-meta/FormMetaProvider";

const P38FormContainer = (props) => {
	const { ...rest } = props;
	const p38 = useContext(P38Context);
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

	const handleSubmit = form.handleSubmit(p38.onEditorSubmit, p38.onEditorSubmitError);
	useHotkeys(["Control+Enter"], () => {
		if (!p38.grid.readOnly) {
			setTimeout(handleSubmit)
		}
	}, {
		enableOnFormTags: true
	})

	useInit(() => {
		p38.loadItem({ id: TourGroupTypes.getDefaultValue() });
	}, []);

	return (
		<FormProvider {...form}>
			<FormMetaProvider {...formMeta}>
				<P38FormView
					loadWorking={p38.loadWorking}
					loadError={p38.loadError}
					{...rest}
				/>
			</FormMetaProvider>
		</FormProvider>
	);
}

P38FormContainer.displayName = "P38FormContainer";
export default P38FormContainer;
