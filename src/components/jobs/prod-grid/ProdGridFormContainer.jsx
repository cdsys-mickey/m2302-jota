import { ProdGridContext } from "@/contexts/prod-grid/ProdGridContext";
import { useContext, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import ProdGridForm from "./ProdGridForm";
import { useCallback } from "react";
import { useMemo } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { FormMetaProvider } from "@/shared-components";
import Prods from "@/modules/Prods.mjs";

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

	// 表單異動監聽請看 ProdGridLoadButtonContainer

	const handleProdIdChange = useCallback((e, newValue, reason) => {
		const input = e.target.value;
		console.log("prodId", input);
		form.setValue("prodId", input);
		form.setValue("prod", null);
	}, [form]);

	const handleProdChange = useCallback((newValue, reason) => {
		console.log(`prod changed, reason: ${reason}, value:`, newValue);
		form.setValue("prodId", newValue ? Prods.getOptionLabelForId(newValue) : "");
	}, [form]);

	const handleProdNameChange = useCallback((e, newValue, reason) => {
		const input = e.target.value;
		console.log("prodName", input);
		form.setValue("prodName", input);
		form.setValue("prod2", null);
	}, [form]);

	const handleProd2Change = useCallback((newValue) => {
		console.log("prod2 changed", newValue);
		form.setValue("prodName", newValue ? Prods.getOptionLabelForName(newValue) : "");
	}, [form]);

	return (
		<div ref={hotkeyRef}>
			<FormProvider {...form}>
				<FormMetaProvider {...prodGrid.formMeta} isFieldDisabled={isFieldDisabled}>
					<ProdGridForm
						handleSubmit={handleSubmit}
						onProdIdChange={handleProdIdChange}
						onProdChange={handleProdChange}
						onProdNameChange={handleProdNameChange}
						onProd2Change={handleProd2Change}
						{...rest}
					/>
				</FormMetaProvider>
			</FormProvider>
		</div>
	);
};

ProdGridFormContainer.displayName = "ProdGridFormContainer";
