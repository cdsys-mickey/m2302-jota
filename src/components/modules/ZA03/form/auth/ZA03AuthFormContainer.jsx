import { FormProvider, useForm } from "react-hook-form";
import ZA03AuthForm from "./ZA03AuthForm";
import { useContext } from "react";
import { ZA03Context } from "../../../../../contexts/ZA03/ZA03Context";
import { useEffect } from "react";

export const ZA03AuthFormContainer = () => {
	const form = useForm();
	const za03 = useContext(ZA03Context);
	const { cancelAuthEditing } = za03;

	// useEffect(() => {
	// 	cancelAuthEditing();
	// }, [cancelAuthEditing]);

	return (
		<FormProvider {...form}>
			<form>
				<ZA03AuthForm editing={za03.editing} />
			</form>
		</FormProvider>
	);
};

ZA03AuthFormContainer.displayName = "ZA03AuthFormContainer";
