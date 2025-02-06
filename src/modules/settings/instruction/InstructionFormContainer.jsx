/* eslint-disable no-mixed-spaces-and-tabs */
import { SettingsContext } from "@/modules/settings/SettingsContext";
import { useInit } from "@/shared-hooks/useInit";
import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InstructionForm from "./InstructionForm";

export const InstructionFormContainer = () => {
	const settings = useContext(SettingsContext);
	const form = useForm({
		defaultValues: {
			downloadPrompt: true
		},
	});

	const { reset } = form;

	useInit(() => {
		reset({
			downloadPrompt: !settings.isDownloadPromptDisabled()
		})
	}, []);

	return (
		<FormProvider {...form}>
			<InstructionForm handleDownloadPromptChange={settings.handleDownloadPromptChange} />
		</FormProvider>
	);
};

InstructionFormContainer.displayName = "InstructionFormContainer";
