import { useFormContext } from "react-hook-form";
import B06Form from "./B06Form";
import { useContext } from "react";
import { B06Context } from "../../../../contexts/B06/B06Context";

export const B06FormContainer = () => {
	const b06 = useContext(B06Context);
	const form = useFormContext({
		defaultValues: {
			quotes: [],
		},
	});

	const handleSubmit = form.handleSubmit(
		b06.onSearchSubmit,
		b06.onSearchSubmitError
	);

	return <B06Form onSubmit={handleSubmit} />;
};

B06FormContainer.displayName = "B06FormContainer";
