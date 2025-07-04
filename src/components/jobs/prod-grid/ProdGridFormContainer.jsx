import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useContext } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import ProdGridForm from "./ProdGridForm";
import { FormMetaProvider } from "../../../shared-contexts/form-meta/FormMetaProvider";
import { useCallback } from "react";
import { useMemo } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const ProdGridFormContainer = (props) => {
	const { ...rest } = props;
	const form = useForm({
		defaultValues: {},
	});
	const prodGrid = useContext(ProdGridContext);

	const catL = useWatch({
		name: "catL",
		control: form.control
	});

	const catM = useWatch({
		name: "catM",
		control: form.control
	});



	const isFieldDisabled = useCallback(
		(field) => {
			switch (field.name) {
				case "catM":
					return !catL;
				case "catS":
					return !catM
				default:
					return false;
			}
		},
		[catL, catM]
	);

	const handleSubmit = useMemo(() => {
		return form.handleSubmit(
			prodGrid.onSubmit,
			prodGrid.onSubmitError
		)
	}, [form, prodGrid.onSubmit, prodGrid.onSubmitError]);

	const hotkeyRef = useHotkeys("Ctrl+Enter", handleSubmit, {
		enableOnFormTags: true,
	});

	return (
		<div ref={hotkeyRef}>
			<FormProvider {...form}>
				<FormMetaProvider {...prodGrid.formMeta} isFieldDisabled={isFieldDisabled}>
					<ProdGridForm
						handleSubmit={handleSubmit}
						{...rest}
					/>
				</FormMetaProvider>
			</FormProvider>
		</div>
	);
};

ProdGridFormContainer.displayName = "ProdGridFormContainer";
