import { FormProvider, useForm } from "react-hook-form";
import P37FormView from "./P37FormView";

const P37FormContainer = (props) => {
	const { ...rest } = props;
	const form = useForm();
	return (
		<FormProvider {...form}>
			<P37FormView  {...rest} />
		</FormProvider>
	);
}

P37FormContainer.displayName = "P37FormContainer";
export default P37FormContainer;