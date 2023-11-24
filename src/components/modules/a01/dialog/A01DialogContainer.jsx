import { FormProvider, useForm } from "react-hook-form";
import A01Dialog from "./A01Dialog";
import { useContext } from "react";
import { A01Context } from "../../../../contexts/a01/A01Context";

export const A01DialogContainer = () => {
	const forms = useForm();
	const a01 = useContext(A01Context);
	return (
		<FormProvider {...forms}>
			<form>
				<A01Dialog open={a01.dialogOpen} />
			</form>
		</FormProvider>
	);
};

A01DialogContainer.displayName = "A01DialogContainer";
