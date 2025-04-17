import PropTypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import { useG01 } from "./useG01";
import StdPrint from "../StdPrint.mjs";
import { G01Context } from "./G01Context";


export const G01Provider = ({ children }) => {
	const g01 = useG01();
	const form = useForm({
		defaultValues: {
			EDate: new Date(),
			CustID: "",
			CustName: "",
			Tel: "",
			outputType: StdPrint.getDefaultOption(),
		},
	});

	return (
		<FormProvider {...form}>
			<G01Context.Provider
				value={{
					...g01,
					handleSubmit: form.handleSubmit(
						g01.onSubmit,
						g01.onSubmitError
					),
				}}>
				{children}
			</G01Context.Provider>
		</FormProvider>
	);
};

G01Provider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};



