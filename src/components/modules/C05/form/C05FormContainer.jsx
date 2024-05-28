import { useFormContext } from "react-hook-form";
import C05Form from "./C05Form";
import { useContext } from "react";
import { C05Context } from "@/contexts/C05/C05Context";

export const C05FormContainer = () => {
	const C05 = useContext(C05Context);
	const form = useFormContext({
		defaultValues: {},
	});

	const handleSubmit = form.handleSubmit(
		C05.onSearchSubmit,
		C05.onSearchSubmitError
	);

	return <C05Form onSubmit={handleSubmit} />;
};

C05FormContainer.displayName = "C05FormContainer";
